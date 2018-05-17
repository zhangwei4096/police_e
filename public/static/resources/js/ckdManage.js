/**
 * 初始化详情列表
 * @param data
 */
function initRowsFromData(size , editable){
	  var token = 'readonly=\"true\"' ;
	  if(editable){
		  token = "";
		  $("#dlg-save").removeClass("hide");
	  }else{
		  $("#dlg-save").addClass("hide");
	  }
	  for( var  index=0 ;index<size; index++){
		    var temp = $("#tab tr");
			var currentRow = "items["+index+"]";
			var trid = new Date().getTime();
			
			var html = "<tr id="+ trid + ">"+  
			"<td><input type=\"hidden\" name='" + currentRow +".id' >    <input class='text01' type='text'   name='"+ currentRow +".materialid'  readonly=\"true\"/></td>"+
			"<td><input readonly=\"true\"   type='text'    name='"+ currentRow +".material_name' /></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".material_brand'/></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".material_attr'/></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".material_unit' /></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".inventory_real_quantity'  id='mt_realquantity_"+ trid +"'/></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".request_quantity' id='mt_request_quantity_"+ trid +"'/></td>"+
			"<td><input  "+ token + "class='text01' type='text'   name='"+ currentRow +".real_quantity'  id='mt_movequantity_"+ trid +"'/></td>"+
			"</tr>";
			
			 
			 $("#totalRow").before(html);
			 if(editable){
					//添加验证
					$('#mt_movequantity_'+trid).numberbox({
						required:true ,
						validType: "smallerThan['#mt_realquantity_"+ trid +"','#mt_request_quantity_"+ trid +"']" ,
						onChange:function(a,b){
							$(".dataintable").trigger("dataChange");
						}
					});
			 }
	  }
}

//提交单据 审核 拒绝
function doCommitByURL(uri){
	 $.ajax({ 
			url:  root + '/ckd/' + uri +'.do',
			data: {ckdid :$("#id").val() } ,
			success:function(res){
				$('#dg').datagrid("reload");
				if(res.code == '0000'){
					$.messager.alert("系统提示","提交成功") ;
				}else{
					$.messager.alert("系统提示",res.msg);
					return;
				}
			}
	  });
}

//验证出库数量大于等于0  小于计划数量  小于库存数量
$.extend($.fn.validatebox.defaults.rules, {   
	smallerThan: {   
      validator: function(value,param){
            return parseInt(value) <= $(param[0]).val() && parseInt(value) >= 0 && parseInt(value) <= $(param[1]).val();
      },   
      message: '输入出库数量不正确'  
  }   
});  

function clearOpenDlg(){
	resetValue();
	$(".dataintable tbody tr ").not(":last").remove();
}

function getEditable(str){
	if("审核未通过" == str || "待收货" == str){
		return true;
	}
	return false;
}

$(document).ready(function(){
		  $("#dg").datagrid({
			  "onDblClickRow" : function(index, row){
				  $.ajax({
					  url: root +'/ckd/getCKD.do',
					  data: {ckdid:row.id },
					  success:function(res){
						   res.warehouse_type = warehouseTypeFormatter(  res.warehouse_type);
						   clearOpenDlg();
						   $("#materialdlg").dialog("close");
 						   $("#materialdlg").dialog("open").dialog("setTitle",'出库单');
 						   var size = res.items.length ;
 						   initRowsFromData(size , getEditable(res.status));
 						   if("待收货"  == res.status){
 							  $("#a1").addClass("hide");
 							  $("#a2").addClass("hide");
 							  $("#a3").addClass("hide");
 							  $("#a4").addClass("hide");
 						   }else{
 							  $("#a1").removeClass("hide");
 							  $("#a2").removeClass("hide");
 							  $("#a3").removeClass("hide");
 							  $("#a4").removeClass("hide");
 						   }
 						   
 						   $('#fm').form('myLoad',res); 
 						   $(".dataintable").trigger("dataChange");
 						   
 						 
 						   
					  },error:function(res){
						   $.messager.alert("系统提示","获取数据失败"); 
					  }
				  })
			 }
		  });

		   //数据变更更新合计
			 $(".dataintable").bind("dataChange" ,function(e){
				 var totalRealQuantity = 0 ;  
				 var totalVQuantity = 0 ;
				 var totalPurchaseNum= 0  ;
				 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
					 var real_quantity =  $(this).find("td:eq(5) input").val() + "" ; //库存数量
					 var  vQuantity =  $(this).find("td:eq(6) input").val() + "";    //虚拟库存
					 var  PurchaseNum =  $(this).find("td:eq(7) input").val() + "";    //申购数量
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
});

function doFixCKD(){
//	 var vQuantity =  $("#totalRow #totalVQuantity").text();
//	 var PurchaseNum = $("#totalRow #totalPurchaseNum").text();
//	 
//	 if(vQuantity.trim()== ""){
//		 vQuantity = 0 ;
//	 }
//	 if(PurchaseNum.trim()== ""){
//		 PurchaseNum = 0 ;
//	 }
// 	 var vq  =  parseFloat(vQuantity);
//	 var pn =  parseFloat(PurchaseNum);
//     var warning = "确认出库吗?";
//	 if( vq > pn){
////		 $.messager.confirm("警告","出库数量小于计划领用数量!");
//		 warning = "出库数量小于计划领用数量!确认出库吗?" ;
//	 }
	 $.messager.confirm("系统提示","确认出库吗?",function(r){
			if(r){	
				 $("#fm").form("submit",{
						url: root +'/ckd/doFixCKD.do' ,
						onSubmit:function(){
							return $(this).form("validate");
						},
						success:function(result){
							$('#dg').datagrid('reload');
							res = JSON.parse(result);
							if(res.code == '0000'){
								$.messager.alert("系统提示","保存成功","info",function(){
									$("#materialdlg").dialog("close");
								});
							}else{
								$.messager.alert("系统提示",res.msg ,"info",function(){
									$("#materialdlg").dialog("close");
								});
								return;
							}
						}
				 });
			}
	   });
}
