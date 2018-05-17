/**
 * 初始化详情列表
 * @param data
 */
function initRowsFromData(size){
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
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".excute_quantity'  id='mt_excute_quantity_"+ trid +"'/></td>"+
			"</tr>";
			
		 
			$("#totalRow").before(html);
			
			//添加验证
//			$('#mt_movequantity_'+trid).numberbox({
//				required:true ,
//				validType: "smallerThan['#mt_realquantity_"+ trid +"','#mt_request_quantity_"+ trid +"']" ,
//				onChange:function(a,b){
//					$(".dataintable").trigger("dataChange");
//				}
//			});
	  }
}

//验证出库数量大于等于0  小于计划数量  小于库存数量
//$.extend($.fn.validatebox.defaults.rules, {   
//	smallerThan: {   
//      validator: function(value,param){
//            return parseInt(value) <= $(param[0]).val() && parseInt(value) >= 0 && parseInt(value) <= $(param[1]).val();
//      },   
//      message: '输入出库数量不正确'  
//  }   
//});  

function clearOpenDlg(){
	resetValue();
	$(".dataintable tbody tr ").not(":last").remove();
	$("#materialdlg").dialog("close");
    $("#materialdlg").dialog("open").dialog("setTitle",'领料单');
}

$(document).ready(function(){
		 //数据变更更新合计
		 $(".dataintable").bind("dataChange" ,function(e){
			 var totalRealQuantity = 0 ;  
			 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
				 var real_quantity =  $(this).find("td:eq(5) input").val() + "" ; //计划数量
				 if(real_quantity.trim()== ""){
					 real_quantity = 0 ;
				 }
				 var aq =  parseFloat(real_quantity);
				 totalRealQuantity+=aq;
	    	 });
	
			 $("#totalRow #totalRealQuantity").text(totalRealQuantity);
		 });
	 
		  $("#dg").datagrid({
			  "onDblClickRow" : function(index, row){
				  $("#materialdlg").dialog("open").dialog("setTitle",'领料单');
				  $.ajax({
					  url: root +'/ckplan/getCkPlan.do' ,
					  data: {ckpid:row.ckpid },
					  success:function(res){
						   res.data.warehouse_type = warehouseTypeFormatter(  res.data.warehouse_type);
						   clearOpenDlg();
 						   var size = res.data.items.length ;
 						   initRowsFromData(size);
 						   $('#fm').form('myLoad',res.data); 
 						   $(".dataintable").trigger("dataChange");
					  },error:function(res){
						   $.messager.alert("系统提示","获取数据失败"); 
					  }
				  })
			 }
		  });
});
//
//function doExcuteShip(){
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
//	 
//     
//	 $.messager.confirm("系统提示",warning,function(r){
//			if(r){	
//				 $("#fm").form("submit",{
//						url: root +'/ckplan/getCkPlan.do' ,
//						onSubmit:function(){
//							return $(this).form("validate");
//						},
//						success:function(result){
//							$('#dg').datagrid('reload');
//							res = JSON.parse(result);
//							if(res.code == '0000'){
//								$.messager.alert("系统提示","保存成功","info",function(){
//									$("#materialdlg").dialog("close");
//								});
//							}else{
//								$.messager.alert("系统提示",res.msg ,"info",function(){
//									$("#materialdlg").dialog("close");
//								});
//								return;
//							}
//						}
//				 });
//			}
//	   });
//}
