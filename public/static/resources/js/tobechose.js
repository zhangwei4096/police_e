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
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".inventory_real_quantity'  id='mt_realquantity_"+ trid +"'/></td>"+
			"<td><input readonly=\"true\" class='text01' type='text'   name='"+ currentRow +".request_quantity' id='mt_request_quantity_"+ trid +"'/></td>"+
//			"<td><input class='text01' type='text'   name='"+ currentRow +".real_quantity'  id='mt_movequantity_"+ trid +"'/></td>"+
			"</tr>";
			
			console.log(html);
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

$(document).ready(function(){
	
	
		 $("#delivery_org").combobox({
			url: root + '/wmslogistics/getAll.do' ,
			valueField:'id',   
			textField:'short_company'  
		 });
	   
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
 						   initRowsFromData(size);
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
