	  $(document).ready(function(){
		 $('#transport_style').combobox({
			 required:true ,
			 data: [ {   
					    "value":0,   
					    "text":"请选择"  
					},{   
					    "value":1,   
					    "text":"送货上门"  
					},{   
					    "value":2,   
					    "text":"上门自取"  
					}]  
		 }); 
		 
		 
	
			// 送货地编号 下拉框选择控件
		  $('#transport_id').combobox({   
		  	url:root +'/wmstransport/getTransport.do',   
		         editable:true,
		         required:true ,
		         validType:'NUM',
		         cache: false,  
		         panelHeight: 160,  
		         valueField:'transport_id',     
		         textField:'transport_id',
		         onChange:function(rec){   
		        	 validType:'NUM',
		             console.log(rec);
		                $("#transport_add").val('');
		              
		          } ,
		         onSelect:function(rec){    
		             console.log(rec);
		             
		                $("#transport_add").val(rec.transport_add);//在选择类别的时候 清空名称的输入值
		                $("#transport_id").val(rec.transport_id);
		              
		          } ,
		  }); 

		
			 //数据变更更新合计
			 $(".dataintable").bind("dataChange" ,function(e){
				 var totalRealQuantity = 0 ;  
				 var totalVQuantity = 0 ;
				 var totalPurchaseNum=0;
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
				  orderedTr();
			 });
			 
			 
			 
			   //初始化物料弹出框
			  $("#materialtb").datagrid({
				  url: root +'/inventory/queryForPage.do',
				  "onDblClickRow" : function(index, row){
					   $("#materialdlg").dialog("close");
				 $("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").val(row.material_id) ;
				 $("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").focus();
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
		     
		});





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
			var temp = $("#tab tr");
				var mt = "items["+index+"]";
				var trid = new Date().getTime();
			var html = "<tr id="+ trid + ">"+
		"<td><input class='text-2' type='text' maxlength='20' name='"+mt+".material_id'  id='mt_"+trid+"'/><input type=\"button\" value=\"\" class=\"icon-search\" title=\"查询\" onclick=\"queryMaterial("+ trid +")\">"+
		"<td><input readonly=\"true\" class='text-2' type='text   id='mt_name" +trid+"'/>"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='15'   />"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20'   />"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='15'   />"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20'   id='mt_realquantity"+trid+"'/>"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20'   id='mt_vquantity"+trid+"'/>"+
		"<td><input readonly=\"true\" class='text-2' type='text'  maxlength='20'   id='mt_safequntity"+trid+"'/>"+
		"<td><input  class='easyui-numberbox' type='text'   maxlength='20' name='"+mt+".purchase_num'  id='mt_purchase_num_"+trid+"'/>"+
		"<td><input class='easyui-datebox' data-options='width:100'  name='"+mt+".arrival_date'   id='mt_arrival_date_"+trid+"'/>"+
		   
		"<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ trid +")\">"+
		"</tr>";
				
				$("#totalRow").before(html);
				//添加验证
				$('#mt_purchase_num_'+trid).numberbox({
					required:true ,
					onChange:function(a,b){
						$(".dataintable").trigger("dataChange");
					}
				});
		$('#mt_purchase_num_'+trid).validatebox({
			required:true ,
			validType:'NUM'
		});
		$('#mt_arrival_date_'+trid).datebox({
			required:true ,
			validType: "smallerThan['#mt_arrival_date_"+ trid +"']" 
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
//		 			$(e).parents("tr").remove();
//		 			$(".dataintable tbody tr:eq("+  index +")").remove();
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
			 
				
		
			  function save(){
				  var tran_style=$('#transport_style').combobox('getValue');
				  if(''==tran_style||"0"==tran_style){
						 $.messager.alert("系统提示","请选择送货类型");
							return;
					}
				  var tran_id=$('#transport_id').combobox('getText');
					if(tran_id.length!=5){
						 $.messager.alert("系统提示","送货地编号只能是五位数字");
							return;
					}
				 if($(".dataintable").find("tr").length<3){
					 $.messager.alert("系统提示","请先添加物料");
						return;
				 }
				 $.messager.confirm("系统提示","确认提交该申购单吗?",function(r){
						if(r){	
							 $("#fm").form("submit",{
									url: root +'/wmspurchase/doSave.do' ,
									onSubmit:function(){
										return $(this).form("validate");
									},
									success:function(result){
										$('#dg').datagrid('reload');
										res = JSON.parse(result);
										if(res.code == '0000'){
											$.messager.alert("系统提示","保存成功","info",function(){
												closeDialog();
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
			  
  function ckeckNum(value) {  
        var re = /^\d{n}$/;
        return re.test(value);  
    }
	
  
  function getCTime(){
	  var myDate = new Date();
      var year = myDate.getFullYear();
      var month = myDate.getMonth() + 1;
      var day=myDate.getDate();
     return year+"-"+month+"-"+day ;
  }