	  $(document).ready(function(){
		  $("#dg").datagrid({
			  "onDblClickRow" : function(index, row){
				  showDitail(row.id);
			 }
			
		  });
		  
		 $('#sg_status').combobox({
				 width:90,
				 panelHeight: 'auto', 
					data:  [ {   
					    "value":'',   
					    "text":"全部"  
					},{   
					    "value":1,   
					    "text":"待采购"  
					},{   
					    "value":2,   
					    "text":"采购中"  
					},{   
					    "value":3,   
					    "text":"已完成"  
					}]  
		 }); 
		
		 $('#sg_source').combobox({
			 width:90,
			 panelHeight: 'auto', 
				data: [ {   
					    "value":'',   
					    "text":"全部"  
					},{   
					    "value":1,   
					    "text":"手动创建"  
					},{   
					    "value":2,   
					    "text":"补充库存"  
					},{   
					    "value":3,   
					    "text":"库存(直供)"  
					}]  
		 } ); 
		 $('#date_style').combobox({
			 width:108,
			 panelHeight: 'auto', 
			 data: [ {   
					    "value":0,   
					    "text":"申购日期"  
					},{   
					    "value":1,   
					    "text":"采购/关闭日期"  
					},{   
					    "value":2,   
					    "text":"用料日期"  
					}]  
		 }); 	 
		 
		  
		  //数据变更更新合计
			 $(".dataintable").bind("dataChange" ,function(e){
				 
				 var totalRealQuantity = 0 ;  
				 var totalVQuantity = 0 ;
				 var totalPurchaseNum= 0  ;
				 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
					 var real_quantity =  $(this).find("td:eq(5) input").val() + "" ; //库存数量
					 var  vQuantity =  $(this).find("td:eq(6) input").val() + "";    //虚拟库存
					 var  PurchaseNum =  $(this).find("td:eq(8) input").val() + "";    //申购数量
					 if(real_quantity.trim()== ""){
						 real_quantity = 0 ;
					 }
					 if(vQuantity.trim()== ""){
						 vQuantity = 0 ;
					 }
					 if(PurchaseNum.trim()== ""){
						 PurchaseNum = 0 ;
					 }
					 var aq =  parseFloat(real_quantity);
					 var vq  =  parseFloat(vQuantity);
					 var pn =  parseFloat(PurchaseNum);
					 
					 totalRealQuantity+=aq;
					 totalVQuantity+=vq;
					 totalPurchaseNum+=pn;
		     	 });
				 

				 $("#totalRow #totalRealQuantity").text(totalRealQuantity);
				 $("#totalRow #totalVQuantity").text(totalVQuantity);
				 $("#totalRow #totalPurchaseNum").text(totalPurchaseNum);
				 
			 });
			 
			 
			 
			   //初始化物料弹出框
			  $("#materialdb").datagrid({
				  url: root +'/inventory/queryForPage.do',
				  "onDblClickRow" : function(index, row){
					   $("#materialddg").dialog("close");
				 $("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").val(row.material_id) ;
				$("#"+selectedMaterialRowIndex+" td:eq(1) input").val(row.material_name) ;
				$("#"+selectedMaterialRowIndex+" td:eq(2) input").val(row.material_brand) ;
				$("#"+selectedMaterialRowIndex+" td:eq(3) input").val(row.material_attr) ;
				$("#"+selectedMaterialRowIndex+" td:eq(4) input").val(row.material_unit) ;
				$("#"+selectedMaterialRowIndex+" td:eq(5) input").val(row.real_quantity) ;
				$("#"+selectedMaterialRowIndex+" td:eq(6) input").val(row.virtual_quntity) ;
				$("#"+selectedMaterialRowIndex+" td:eq(7) input").val(row.safe_quntity) ;
				
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
			  $('#materialdlg').dialog({  
					onClose:function(){  
						falg=0; 
				}});
			  $("#addtr").bind("click", function () {
					 if($("#addtr").val()=="编辑"){   
						 $("#addtr1").attr("disabled",false); 
						 $("#addtr").val("保存全部");
						  $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
							var param0=$(this).find("td:eq(10) input").val() ;
							var param1=$(this).find("td:eq(11) input").val() ;
								 $(this).find("td:eq(8) input").attr("readonly",false) ; //申购数量置为可编辑
								 $(this).find("td:eq(9) input").attr("readonly",false) ; //到货日期置为可编辑
								 $(this).find("td:eq(9) input").datebox({
										required:true 
									});
								 $(this).find("td:eq(8) input").numberbox({
										required:true ,
										validType: "smallerThan['"+param0+"','"+param1+"']" ,
										onChange:function(a,b){
											$(".dataintable").trigger("dataChange");
										}
									});
								 $(this).find("td:eq(9) input").datebox({
										required:true ,
										validType: "dateCompare['"+param0+"']" 
									});
							});	
						 }else if($("#addtr").val()=="保存全部"){ 
							  $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
									 $(this).find("td:eq(8) input").attr("readonly",false) ; //申购数量置为可编辑
									 $(this).find("td:eq(9) input").attr("readonly",false) ; //到货日期置为可编辑
									
								});
							 
							  savePurchase();
						 }

				});	  

	  });
	  
	  

	  function formatSgState(value, rowData, rowIndex) {
	  	 if (1==value){
	  			return '待采购';
	  		} else if(2==value) {
	  			return '已采购';
	  		}else{
	  			return '已关闭';
	  		}
	  }
	  
	  function formatSgsource(value, rowData, rowIndex) {
		  	 if (1==value){
		  			return '手动创建';
		  		} else if(2==value) {
		  			return '补充库存';
		  		}else{
		  			return '库存(直供)';
		  		}
		  }
	  
	//查询
		function search(){
			var date_style= $('#date_style').combobox('getValue');
			if(''==date_style){
				date_style="0";
			}

			$('#dg').datagrid('load',{
				    "sg_status":$('#sg_status').combobox('getValue'),
				    "sg_source":$('#sg_source').combobox('getValue'),
				    "material_name":   $("#material_name").val() ,
				    "supplier_name":   $("#supplier_name").val() ,
				    "date_style":date_style,
				    "date_begin":   $("#usedate1").datebox('getValue') ,
				    "date_end":   $("#usedate2").datebox('getValue') ,
				    "transport_add":   $("#transport_add").val() 
			});
		}
		
		 
		 
		  //弹出物料查询对话框
		  var  selectedMaterialRowIndex = 0;
		  var  deffunction = 'callback';
		  
		  function callback(index,row){
			  console.log(index, row) ;
		  }
		  function searchMaterial(){
			  $("#materialtb").datagrid("reload");
		  }
  $.extend($.fn.validatebox.defaults.rules, { 
	  dateCompare: {   
	        validator: function(value,param){
	        var d= $.fn.datebox.defaults.parser(value); 
	        var d1= $.fn.datebox.defaults.parser(getCTime()); 
	        	
	        return d.getTime() >= d1.getTime()
	        },   
	        message: '到货日期不能小于当前时间'  
	    }   
	});  
//验证输入的执行采购数量 规则：采购数量<=执行采购数量<=申购数量
  $.extend($.fn.validatebox.defaults.rules, {   
  	smallerThan: {   
          validator: function(value,param){
        	  return parseInt(value) <= param[0] && parseInt(value) > 0 && parseInt(value) >= param[1];
          },   
          message: '执行申购数量只能在申购数量和采购数量之间'  
      }   
  });  
var falg = 0 ;		 
function showDitail(purchase_id){
	 var totalRealQuantity = 0 ;  
	 var totalVQuantity = 0 ;
	 var totalPurchaseNum=0;
	
	$("#materialdlg").dialog("open").dialog("setTitle",'申购单');
	$("#materialtb tr").not(":first").not(":last");
	$(".dataintable tbody tr").not(":last").each(function(index, element){
		 $(element).remove() ;
	});
	 $("#addtr1").attr("disabled",true); 
	 $("#addtr").val("编辑");
	
	  $.ajax({
			url:  root +'/wmspurchase/queryForPage.do',
			data: {id:purchase_id} ,
			success:function(result){
				if(result.total>0){
					 $.each(result.rows, function(i, item){
						 $('.search-info #transport_style').val(transportStyleFormatter(item.transport_style));
						 $('.search-info #transport_id').val(item.transport_id);
						 $(".search-info #transport_addr").val(item.transport_add);
						 $(".search-info #contact_person").val(item.contact_person);
						 $(".search-info #contact_tel").val(item.contact_tel);
						 $("#id").val(item.id);
						 $("#buy_id").val(item.buy_id);
							var trId = "items["+falg+"]";
							
							var trid = new Date().getTime();
						var html = "<tr id="+ trid + ">"+
					"<td><input value="+item.material_id+" class='text00' readonly=\"true\" type='text' name='"+trId+".material_id'  id='trId_"+trid+"'/>"+
					"<td><input  value="+item.material_name+" readonly=\"true\" class='text-1' type='text   id='trId_name" +trid+"'/>"+
					"<td><input  value="+item.brand_name+"  readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
					"<td><input  value="+item.material_value+"  readonly=\"true\" class='text02' type='text'  maxlength='20'   />"+
					"<td><input  value="+item.unit+" readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
					"<td><input  value="+item.real_quantity+" readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_realquantity"+trid+"'/>"+
					"<td><input  value="+item.virtual_quntity+" readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_vquantity"+trid+"'/>"+
					"<td><input  value="+item.safe_quntity+" readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_safequntity"+trid+"'/>"+
					"<td><input value="+item.do_purchase_num+"  readonly=\"true\" class='easyui-numberbox' data-options='width:100' name='"+trId+".do_purchase_num'  id='trId_do_purchase_num_"+trid+"'/>"+
					"<td><input value="+item.arrival_date+" readonly=\"true\" class='easyui-datebox' data-options='width:100'  name='"+trId+".arrival_date'   id='trId_arrival_date_"+trid+"'/>"+
					"<td style='display:none'><input  value="+item.purchase_num+" readonly=\"true\" class='easyui-numberbox' data-options='width:100' name='"+trId+".purchase_num'  id='trId_purchase_num_"+trid+"'/>"+
					"<td  style='display:none'><input value="+item.buy_num+" readonly=\"true\" class='easyui-numberbox' data-options='width:100' name='"+trId+".buy_num'  id='trId_buy_num_"+trid+"'/>"+
					"<td/>"+
					"</tr>";
						 $("#totalRow").before(html);
							
						 var aq =  parseFloat(item.real_quantity);
						 var vq  =  parseFloat(item.virtual_quntity);
						 var pn =  parseFloat(item.do_purchase_num);
						 totalRealQuantity+=aq;
						 totalVQuantity+=vq;
						 totalPurchaseNum+=pn;
						 $("#totalRow #totalRealQuantity").text(totalRealQuantity);
						 $("#totalRow #totalVQuantity").text(totalVQuantity);
						 $("#totalRow #totalPurchaseNum").text(totalPurchaseNum);
						 falg++;
					  });
				
				}
			}
	  });

	}






function addRows(){
	
	var trId = "items["+falg+"]";
	var trid = new Date().getTime();
	
	var html = "<tr id="+ trid + ">"+
	"<td><input class='text00' type='text' name='"+trId+".material_id'  id='trId_"+trid+"'/><input type=\"button\" value=\"\" class=\"icon-search\" title=\"查询\" onclick=\"queryMaterial("+ trid +")\">"+
	"<td><input readonly=\"true\" class='text-1' type='text   id='trId_name" +trid+"'/>"+
	"<td><input readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
	"<td><input readonly=\"true\" class='text02' type='text'  maxlength='20'   />"+
	"<td><input readonly=\"true\" class='text-1' type='text'  maxlength='15'   />"+
	"<td><input readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_realquantity"+trid+"'/>"+
	"<td><input readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_vquantity"+trid+"'/>"+
	"<td><input readonly=\"true\" class='text-1' type='text'  maxlength='20'   id='trId_safequntity"+trid+"'/>"+
	"<td><input  class='easyui-numberbox' data-options='width:100' name='"+trId+".do_purchase_num'  id='trId_do_purchase_num_"+trid+"'/>"+
	"<td><input class='easyui-datebox' data-options='width:100'  name='"+trId+".arrival_date'   id='trId_arrival_date_"+trid+"'/>"+
	
	"<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ trid +")\">"+
	"</tr>";
	
	$("#totalRow").before(html);
	falg++;
	//添加验证
	$('#trId_do_purchase_num_'+trid).numberbox({
		required:true ,
		onChange:function(a,b){
			$(".dataintable").trigger("dataChange");
		}
	});
	
	$('#trId_arrival_date_'+trid).datebox({
		required:true ,
		validType: "dateCompare['"+111+"']" 
	});
	//添加验证
	$('#trId_'+trid).validatebox({
		required:true ,
		validType: "rowNotEqual['trId_'+"+ trid +"]" 
	});
	
			
}
function queryMaterial(fromid ){
	   $("#materialddg").dialog("open");
	   selectedMaterialRowIndex = fromid ;
	   $("#materialdb").datagrid("reload");
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
//			$(e).parents("tr").remove();
//			$(".dataintable tbody tr:eq("+  index +")").remove();
	}
	var res= $.extend($.fn.validatebox.defaults.rules, {   
	 	rowNotEqual: {   
	         validator: function(value,param){
	         	var res = true ;
	         	$.each( $(".dataintable tbody tr ").not(":last").not(":first"), function(index, element){
	         		
	         		 var material_id =  $(this).find("td input:eq(0)").val() ; 
	          	     if(material_id ==  value){
	          	    	 res = false;
	          	     }
	         	 });
	         	
	              return res;   
	         },   
	         message: '出库物料重复'  
	     }   
	 }); 
	 
	function savePurchase(){
		
		 if($(".dataintable").find("tr").length<3){
			 $.messager.alert("系统提示","请先添加物料");
				return;
		 }

		 $.messager.confirm("系统提示","确认提交该申购单吗?",function(r){
				if(r){	
					 $("#fm").form("submit",{
							url: root +'/wmspurchase/doSaveAndDel.do' ,
							onSubmit:function(){
								return $(this).form("validate");
							},
							success:function(result){
								
								res = JSON.parse(result);
								if(res.code == '0000'){
									$.messager.alert("系统提示","保存成功","info",function(){
										$('#dg').datagrid('reload');
										$("#materialdlg").dialog("close");
										falg=0;
										$("#materialdlg tr").not(":first").not(":last").empty();
										closeDialog();
									});
								}else{
									$.messager.alert("系统提示",res.msg ,"info",function(){
										closeDialog();
									});
									return;
								}
							}
					 });
				}
		   });
	}
	  
	function rateFormatter(value,row,index){
		
		if (value==0){
		    return "0";
		} else  {
			
			return (Math.round(value * 10000)/100).toFixed(2) + '%';
		}
	}
	 function getCTime(){
		  var myDate = new Date();
	      var year = myDate.getFullYear();
	      var month = myDate.getMonth() + 1;
	      var day=myDate.getDate();
	     return year+"-"+month+"-"+day ;
	  }