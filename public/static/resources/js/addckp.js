$(document).ready(function(){
    //出库类型限制
	$("#type").combobox({
    	 onSelect:function(record){
    	     if(record.text == '退货出库' || record.text == '报损出库'   ){
    	    	 $('#warehouse_type').combobox('loadData', 
    	    			 [{   
    	    				    "value":2,   
    	    				    "text":"报损仓"  
    	    				} ]  

    	    	 ).combobox('select', '2');
    	    	 $('#consignee_code').attr("readonly",false);
    	    	 if( record.text == '报损出库'  ){
    	    		 $('#consignee_code').attr("readonly",true);
    	    	 }
    	     }else if(record.text == '项目领用'   ){
    	    	 $('#warehouse_type').combobox('loadData', 
    	    			  [  {   
    	    				    "value":1,   
    	    				    "text":"良品仓"  
    	    				} ]  
    	    	 ).combobox('select', '1');
    	    	 $('#consignee_code').attr("readonly",false);
    	     }else{
    	    	 $('#warehouse_type').combobox('loadData', 
    	    			 [ {   
    	    				    "value":1,   
    	    				    "text":"良品仓"  
    	    				},{   
    	    				    "value":2,   
    	    				    "text":"报损仓"  
    	    				}]  
    	    	 ).combobox('select', '1'); 
    	    	 $('#consignee_code').val("");
    	    	 $('#consignee_code').attr("readonly",true);
    	     }
    	 }
     }) ;
	
	$("#type").combobox("select","其他出库");
	
	 //数据变更更新合计
	 $(".dataintable").bind("dataChange" ,function(e){
		 var totalRealQuantity = 0 ;  
		 var totalQuantity = 0 ; 
		 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
			 var real_quantity =  $(this).find("td:eq(5) input").val() + "" ; //库存数量
			 var  quantity =  $(this).find("td:eq(7) input").val() + "";    //输入的数量
//			 console.log(real_quantity) ;
			 
			 if(real_quantity.trim()== ""){
				 real_quantity = 0 ;
			 }
			 if(quantity.trim()== ""){
				 quantity = 0 ;
			 }

			 var aq =  parseFloat(real_quantity);
			 console.log(aq);
			 
			 var bq  =  parseFloat(quantity);
			 totalRealQuantity+=aq;
			 totalQuantity+=bq;
     	 });
		 

		 $("#totalRow #totalRealQuantity").text(totalRealQuantity);
		 $("#totalRow #totalQuantity").text(totalQuantity);
		 
		  orderedTr();
	 });
	 
	 
	 
	   //初始化物料弹出框
	  $("#materialtb").datagrid({
		  url: root +'/inventory/queryForPage.do',
		  "onDblClickRow" : function(index, row){
			   $("#materialdlg").dialog("close");

				$("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").val(row.material_id) ;
				$("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").focus();
				$("#"+selectedMaterialRowIndex+" td:eq(0) input:eq(0)").focus(); 
				$("#"+selectedMaterialRowIndex+" td:eq(1) input").val(row.material_name) ;
				$("#"+selectedMaterialRowIndex+" td:eq(2) input").val(row.material_brand) ;
				$("#"+selectedMaterialRowIndex+" td:eq(3) input").val(row.material_attr) ;
				$("#"+selectedMaterialRowIndex+" td:eq(4) input").val(row.material_unit) ;
				$("#"+selectedMaterialRowIndex+" td:eq(5) input").val(row.real_quantity) ;
				$("#"+selectedMaterialRowIndex+" td:eq(6) input").val(row.virtual_quntity) ;
				if(row.stock_num){
					$('#mt_movequantity_'+selectedMaterialRowIndex).numberbox({precision:row.stock_num});
				}
				
				$(".dataintable").trigger("dataChange");
		 },
		 onBeforeLoad:function(param){
			 
			 param.warehouse_type =  $("#warehouse_type").combobox("getValue") ; 
			 param.material_id =  $("#materialId").val();
			 param.material_name =  $("#materialName").val();
			 param.material_brand =  $("#materialBrand").val();
			 param.material_attr =   $("#materialAttr").val();  
		 } 
	  });
     
});



//验证输入出库数量
$.extend($.fn.validatebox.defaults.rules, {   
	smallerThan: {   
        validator: function(value,param){
        	var type = $("#type").combobox("getValue");
        	if("项目领用" != type  ){
        		return parseInt(value) <= $(param[0]).val() && parseInt(value) > 0
        	}
            return true;   
        },   
        message: '出库数量不能大于库存数量'  
    }   
});  


//验证输入的物料是否重复
$.extend($.fn.validatebox.defaults.rules, {   
	rowNotEqual: {   
        validator: function(value,param){
        	var res = true ;
        	
        	$.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
        		 var materialid =  $(this).find("td input:eq(0)").not("[id = '"+ param[0] +"']") .val() ; 
         	     if(materialid ==  value){
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
				"<td><input class='text01' type='text'  maxlength='20' name='"+mt+".materialid'  id='mt_"+trid+"'/><input type=\"button\" class=\"icon-search\" title=\"查询\" style=\"width:20px;\" onclick=\"queryMaterial("+ trid +")\"></td>"+
				"<td><input readonly=\"true\" class='text01' type='text   /></td>"+
				"<td><input readonly=\"true\" class='text01' type='text' /></td>"+
				"<td><input readonly=\"true\" class='text01' type='text'  /></td>"+
				"<td><input readonly=\"true\" class='text01' type='text'  /></td>"+
				"<td><input readonly=\"true\" class='text01' type='text'  /></td>"+
				"<td><input readonly=\"true\" class='text01' type='text'  id='mt_realquantity_"+trid+"'/></td>"+
				"<td><input readonly=\"true\" class='text01' type='text'  id='mt_vquantity_"+trid+"'/></td>"+
				"<td><input class='easyui-numberbox' type='text'  name='"+mt+".quantity'   id='mt_movequantity_"+trid+"'/></td>"+
				"<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ trid +")\"></td>"+
				"</tr>";
				
				$("#totalRow").before(html);
				
				//添加验证
				$('#mt_movequantity_'+trid).numberbox({
					required:true ,
					validType: "smallerThan['#mt_realquantity_"+ trid +"']" ,
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
			 $(element).find("td:eq(0) input").attr("name","items["+ index+"].materialid") ;
			 $(element).find("td:eq(7) input").attr("name","items["+ index+"].quantity") ;
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
		  
	  function save(){
		  $("#fm").form({
			  onBeforeLoad:function(param){
					console.log("-----------");
					console.log(param);
				
					param.warehouse_type =555;
				}
		  });
		 
		  
		  $("#fm").form("submit",{
				url: root + '/ckplan/save.do' ,
				onSubmit:function(param){
					return $(this).form("validate");
				},
				success:function(result){
					$('#dg').datagrid('reload');
					res = JSON.parse(result);
					if(res.code == '0000'){
						$.messager.alert("系统提示","保存成功","info",function(){
							closeDialog();
							$("#type").combobox("select","其他出库");
							$('#warehouse_type').combobox('select','良品仓'); 
							$("#delivery_type").combobox("select","送货上门");
							
						});
					}else{
						$.messager.alert("系统提示",res.msg ,"info",function(){
							closeDialog();
							$("#type").combobox("select","其他出库");
							$('#warehouse_type').combobox('select','良品仓'); 
							$("#delivery_type").combobox("select","送货上门");
						});
						return;
					}
				}
		 });
	  }
 