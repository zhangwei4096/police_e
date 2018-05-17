$(document).ready(function(){
	$("#instore_date").datebox('setValue',getCTime());
	$("#addtr").attr("disabled",false); 
	 $('#warehouse_type').combobox('loadData', 
			 [ {   
				    "value":1,   
				    "text":"良品仓"  
				}]  
	 ).combobox('select', '1'); 
	//入库类型限制
	 $('#instore_type').combobox({
		 width:108,
		 panelHeight: 'auto', 
		 data: [ {   
			    "value":0,   
			    "text":"采购入库"  
			},{   
			    "value":1,   
			    "text":"余料退回"  
			},{   
			    "value":2,   
			    "text":"其他入库"  
			}] ,
		 onSelect:function(rec){
			 $("#addtr").css("display","none");
		     if(rec.text == '余料退回'){
		    	
		    	 emptyTable();
		    	 $('#buy_id').combobox("setValue","");
		    	 $('#buy_id').combobox("readonly",true);
		    	 $('#supplier_id').combobox("setValue","");
		    	 $('#supplier_id').combobox("readonly",false);
		    	 $('#supplier_name').val('');
		    	 $('#warehouse_type').combobox('loadData', 
		    			 [{   
		    				    "value":2,   
		    				    "text":"报损仓"  
		    				} ]  
	
		    	 ).combobox('select', '2');
		    	
		     }else if(rec.text == '采购入库'){
		    	
		    	 $('#buy_id').combobox("readonly",false);
		    	 $('#supplier_id').combobox("setValue","");
		    	 $('#supplier_id').combobox("readonly",true);
		    	 $('#supplier_name').val('');
		    	 $('#warehouse_type').combobox('loadData', 
		    			  [  {   
		    				    "value":1,   
		    				    "text":"良品仓"  
		    				} ]  
		    	 ).combobox('select', '1');
		    	
		     }else{
		    	
		    	 $("#addtr").css("display","");
		    		
		     }
		 }
	 }); 	 
	
		 
		
		 
	  $('#buy_id').combobox({   
	  	url:root +'/wmsbuy/getDistinctBuy.do',   
	         cache: false,  
	         panelHeight: 'auto',  
	         valueField:'buy_id',     
	         textField:'buy_id',
	         onChange:function(rec){   
	             console.log(rec);
	          } ,
	         onSelect:function(rec){  
	        	 var urlCg=root +'/wmsbuy/queryForPage.do';
	            console.log(rec);
	             showDitail(urlCg,rec.buy_id,"0");
	              
	          } ,
	  }); 
	  
	  $('#supplier_id').combobox({   
		  	url:root +'/wmsSupplier/getSupplier.do',   
		         cache: false,  
		         readonly:true,
		         panelHeight: 'auto',  
		         valueField:'supplier_id',     
		         textField:'supplier_name',
		         onChange:function(rec){   
		             console.log(rec);
		          } ,
		         onSelect:function(rec){  
		        	 $('#supplier_name').val(rec.supplier_name);
		        	 var urlTh=root +'/ckplan/getMaterialFromProj.do';
		        	 
		             showDitail(urlTh,rec.supplier_id,"1");
		              
		          } ,
		  }); 
	 
	  
	   //初始化物料弹出框
	  $("#materialtb").datagrid({
		  url: root +'/inventory/queryForPage.do',
		  "onDblClickRow" : function(index, row){
			   $("#materialdlg").dialog("close");
		 $("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").val(row.material_id) ;
		$("#"+selectedMaterialRowIndex+" td:eq(1) input").val(row.material_name) ;
		$("#"+selectedMaterialRowIndex+" td:eq(2) input").val(row.material_brand) ;
		$("#"+selectedMaterialRowIndex+" td:eq(3) input").val(row.material_attr) ;
		$("#"+selectedMaterialRowIndex+" td:eq(4) input").val(row.material_unit) ;
		$("#"+selectedMaterialRowIndex+" td:eq(5) input").val("0") ;
		$("#"+selectedMaterialRowIndex+" td:eq(6) input").val("0") ;
		$("#"+selectedMaterialRowIndex+" td:eq(7) input").val("0") ;
		
				$(".dataintable").trigger("dataChange");
		 },
		 onBeforeLoad:function(param){
			 
			 param.warehouse_type = "1" ; 
			 param.material_id =  $("#materialId").val();
			 param.material_name =  $("#materialName").val();
			 param.material_brand =  $("#materialBrand").val();
			 param.material_attr =   $("#materialAttr").val();  
		 } 
	  });
	 //数据变更更新合计
 $(".dataintable").bind("dataChange" ,function(e){
	 var totalBuyNum = 0 ;  
	 var totalInstoreNum = 0 ;
	 
	 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
		 var buyNum =  $(this).find("td:eq(5) input").val() + "" ; //库存数量
		 var instoreNum =  $(this).find("td:eq(8) input").val() + "";    //虚拟库存
		
		 if(buyNum.trim()== ""){
			 buyNum = 0 ;
		 }
		 if(instoreNum.trim()== ""){
			 instoreNum = 0 ;
		 }
		
	
		 
		 totalBuyNum+=parseFloat(buyNum);
		 totalInstoreNum+=parseFloat(instoreNum);

 	 });
	 
	 $("#totalRow #totalBuyNum").text(totalBuyNum);
	 $("#totalRow #totalInstoreNum").text(totalInstoreNum);
	  orderedTr();
 });
		 
    
});

//验证输入出库数量
$.extend($.fn.validatebox.defaults.rules, {   
	smallerThan: {   
        validator: function(value,param){
          return parseInt(value) <= $(param[0]).val();
        },   
        message: '入库数量不能大于待入库的数量'  
    }   
});  

		 
function showDitail(url,param,type){
	
	
	 emptyTable();
	 $("#totalRow #totalBuyNum").text(0);
	 $("#totalRow #totalInstoreNum").text(0);
	
	var supplier_id="";
	var supplier_name="";
	if("0"==type){
		var falg = 0 ;
		  $.ajax({
				url: url,
				data: {buy_id:param,cg_status:"2"} ,
				success:function(result){
					
					if(result.total>0){
						 $.each(result.rows, function(i, item){
							
							 supplier_id=item.supplier_id;
							 supplier_name=item.supplier_name;
							 $('#supplier_id').combobox("setValue",supplier_id);
							 $('#supplier_name').val(supplier_name);
							var trId = "items["+falg+"]";
							var trid = new Date().getTime();
							var html = "<tr id="+ trid + ">"+
						"<td><input value="+item.material_id+" class='text00' readonly=\"true\" type='text' name='"+trId+".material_id'  id='trId_"+trid+"'/>"+
						"<td><input  value="+item.material_name+" readonly=\"true\" class='text-1' type='text   id='trId_name_" +trid+"'/>"+
						"<td><input  value="+item.brand_name+"  readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
						"<td><input  value="+item.material_value+"  readonly=\"true\" class='text02' type='text'  maxlength='20'   />"+
						"<td><input  value="+item.unit+" readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
						"<td><input  value="+item.buy_num+" readonly=\"true\" class='text-1' type='text'  maxlength='20' name='"+trId+".buy_num'  id='trId_buy_num_"+trid+"'/>"+
						"<td><input  value="+item.do_buy_num+" readonly=\"true\" class='text-1' type='text'  maxlength='20' name='"+trId+".do_buy_num'  id='trId_do_buy_num_"+trid+"'/>"+
						"<td><input  value="+item.wait_instore_num+" readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_wait_instore_num_"+trid+"'/>"+
						"<td><input  class='easyui-numberbox' type='text' data-options='width:100' name='"+trId+".instore_num'  id='trId_instore_num_"+trid+"'/>"+
						"<td/>"+
						"</tr>";
							 $("#totalRow").before(html);
							//添加验证
								$('#trId_instore_num_'+trid).numberbox({
									required:true ,
									validType: "smallerThan['#trId_wait_instore_num_"+ trid +"']" ,
									onChange:function(a,b){
										$(".dataintable").trigger("dataChange");
									}
								});
								
								
							 falg++;
						  });
						
					
					}
				}
		  });
	
	}else if("1"==type){
		
		var num = 0 ;
		  $.ajax({
				url: url,
				data: {consignee_code:param} ,
				success:function(result){
					console.log(result.data);
					if(result.code=="0000"){
						 $.each(result.data, function(i, item){
							/* supplier_id=item.supplier_id;
							 supplier_name=item.supplier_name;
							 $('#supplier_id').combobox("setValue",supplier_id);
							 $('#supplier_name').val(supplier_name);*/
							var trId = "items["+num+"]";
							var trid = new Date().getTime();
							var html = "<tr id="+ trid + ">"+
						"<td><input value="+item.materialid+" class='text00' readonly=\"true\" type='text' name='"+trId+".material_id'  id='trId_"+trid+"'/>"+
						"<td><input  value="+item.material_name+" readonly=\"true\" class='text-1' type='text   id='trId_name_" +trid+"'/>"+
						"<td><input  value="+item.material_brand+"  readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
						"<td><input  value="+item.material_attr+"  readonly=\"true\" class='text02' type='text'  maxlength='20'   />"+
						"<td><input  value="+item.material_unit+" readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
						"<td><input  value="+item.excute_quantity+" readonly=\"true\" class='text-1' type='text'  maxlength='20' name='"+trId+".buy_num'  id='trId_buy_num_"+trid+"'/>"+
						"<td><input  value="+item.excute_quantity+" readonly=\"true\" class='text-1' type='text'  maxlength='20' name='"+trId+".do_buy_num'  id='trId_do_buy_num_"+trid+"'/>"+
						"<td><input  value="+item.excute_quantity+" readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_wait_instore_num_"+trid+"'/>"+
						"<td><input  class='easyui-numberbox' type='text' data-options='width:100' name='"+trId+".instore_num'  id='trId_instore_num_"+trid+"'/>"+
						"<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ trid +")\">"+
						"</tr>";
							
							 $("#totalRow").before(html);
							//添加验证
								$('#trId_instore_num_'+trid).numberbox({
									required:true ,
									validType: "smallerThan['#trId_wait_instore_num_"+ trid +"']" ,
									onChange:function(a,b){
										$(".dataintable").trigger("dataChange");
									}
								});
								
								
								num++;
						  });
						
					
					}
				}
		  });
	}else{
		
		
		
	}
	
	
}
//验证输入的物料是否重复
$.extend($.fn.validatebox.defaults.rules, {   
	rowNotEqual: {   
        validator: function(value,param){
        	var res = true ;
        	$.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
        		 var material_id =  $(this).find("td input:eq(0)").not("[id = '"+ param[0] +"']") .val() ; 
         	     if(material_id ==  value){
         	    	 res = false;
         	     }
        	 });
        	
             return res;   
        },   
        message: '出库物料重复'  
    }   
}); 


var index = 0 ;
function addtr(){
	
		var mt = "items["+index+"]";
		var trid = new Date().getTime();
	var html = "<tr id="+ trid + ">"+
	"<td><input class='text-2' type='text' maxlength='20' name='"+mt+".material_id'  id='mt_"+trid+"'/><input type=\"button\" value=\"\" class=\"icon-search\" title=\"查询\" onclick=\"queryMaterial("+ trid +")\">"+
	"<td><input readonly=\"true\" class='text-2' type='text   id='mt_name" +trid+"'/>"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='15'   />"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20'   />"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='15'   />"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20' />"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20' />"+
	"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20' />"+
	"<td><input  class='easyui-numberbox' type='text' data-options='width:100' name='"+mt+".instore_num'  id='trId_instore_num_"+trid+"'/>"+
	"<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ trid +")\">"+
	"</tr>";
		
		$("#totalRow").before(html);
		//添加验证
		//添加验证
		$('#trId_instore_num_'+trid).numberbox({
			required:true ,
			
			onChange:function(a,b){
				$(".dataintable").trigger("dataChange");
			}
		});

		//添加验证
		$('#mt_'+trid).validatebox({
			required:true ,
			validType: "rowNotEqual['mt_'+"+ trid +"]" 
		});
		index++;
		orderedTr();
}
		
		
	//保存之前对TR排序
	function orderedTr(){
		$(".dataintable tbody tr").each(function(index, element){
			 $(element).find("td:eq(0) input").attr("name","items["+ index+"].material_id") ;

		});
	}
		
	
		function deltr( trid ){
			$("#"+trid).remove();
			$(".dataintable").trigger("dataChange");
			orderedTr();
// 			$(e).parents("tr").remove();
// 			$(".dataintable tbody tr:eq("+  index +")").remove();
		}
	     
		  //弹出物料查询对话框
		  var  selectedMaterialRowIndex = 0;
		  var  deffunction = 'callback';
		  
		  function callback(index,row){
			  console.log(index, row) ;
		  }
		  
		  function queryMaterial(fromid ){
			   $("#materialdlg").dialog("open");
			   selectedMaterialRowIndex = fromid ;
			   $("#materialtb").datagrid("reload");
		  }
	 
		  
	  function searchMaterial(){
		  $("#materialtb").datagrid("reload");
	  }
	 

function emptyTable(){
	$(".dataintable tbody tr").not(":last").each(function(index, element){
		 $(element).remove() ;
	});
}
function deltr( trid ){
	$("#"+trid).remove();
	$(".dataintable").trigger("dataChange");
	orderedTr();
}
//保存之前对TR排序
function orderedTr(){
	$(".dataintable tbody tr").each(function(index, element){
		 $(element).find("td:eq(0) input").attr("name","items["+ index+"].material_id") ;

	});
}

function save(){
	
	if($("#instore_date").datebox('getValue')==""){
		$.messager.alert("系统提示","请选择入库时间");
		return;
	}
	 
	 if($(".dataintable").find("tr").length<3){
		 $.messager.alert("系统提示","请先添加入库明细");
			return;
	 }
	
	 
	 $.messager.confirm("系统提示","确认提交该入库单吗?",function(r){
			if(r){	
				 $("#fm").form("submit",{
						url: root +'/wmsinstore/doSave.do' ,
						onSubmit:function(){
							return $(this).form("validate");
						},
						success:function(result){
							res = JSON.parse(result);
							if(res.code == '0000'){
								$.messager.alert("系统提示","保存成功","info",function(){
									location.reload() ;
								});
							}else{
								$.messager.alert("系统提示",res.msg ,"info",function(){
								
								});
								return;
							}
						}
				 });
			}
	   });
}


function getCTime(){
	  var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day=myDate.getDate();
   return year+"-"+month+"-"+day ;
}