$(document).ready(function(){

	// 初始化单据状态
	 $('#docket_type').combobox({
		 required:true ,
		 panelHeight: 'auto',
		 data: [{   
				    "value":'',   
				    "text":"请选择"  
				},{   
				    "value":'FIRSTAUDITING',   
				    "text":"初审中"  
				},{   
				    "value":'REAUDITING',   
				    "text":"复审中"  
				},{   
				    "value":'COMPLETE',   
				    "text":"已审核"  
				},{   
				    "value":'CANCEL',   
				    "text":"不通过"  
				}]  
	 }); 
	 
	//入库类型限制
	 $('#instore_type').combobox({
		 
		 panelHeight: 'auto', 
		 data: [{   
			    "value":'',   
			    "text":"请选择"  
			},{   
			    "value":'0',   
			    "text":"采购入库"  
			},{   
			    "value":'1',   
			    "text":"余料退回"  
			},{   
			    "value":'2',   
			    "text":"其他入库"  
			}] 
	 });
	 
	 
	  $("#dg").datagrid({
		  "onDblClickRow" : function(index, row){
			  $.ajax({
				  url: root +'/wmsinstore/queryForPage.do',
				  data: {id:row.id },
				  success:function(res){
					
					  res.warehouse_type = warehouseTypeFormatter(  res.warehouse_type);
					   $("#materialdlg").dialog("close");
					   $("#materialdlg").dialog("open").dialog("setTitle",'');
					  
						
					   var size = res.total ;
					   initRowsFromData(res.rows);
					  
					   $(".dataintable").trigger("dataChange");
				  },error:function(res){
					   $.messager.alert("系统提示","获取数据失败"); 
				  }
			  })
		 }
	  });
	  
	  //数据变更更新合计
		 $(".dataintable").bind("dataChange" ,function(e){
			 
			 var totalInstoreNum=0;
			 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
				 var instore_num =  $(this).find("td:eq(7) input").val() + "" ; //入库数量
				
				 if(instore_num.trim()== ""){
					 instore_num = 0 ;
				 }
				
				 var pn =  parseFloat(instore_num);
				 totalInstoreNum+=pn;
	     	 });
			 

			 $("#totalRow #totalInstoreNum").text(totalInstoreNum);
		
			 
		 });
		 
		 
    
});



//格式化单据状态
function formatDocketType(value, row, index) {
	if (value == 'FIRSTAUDITING') {
		return '初审中';
	} else if (value == 'REAUDITING') {
		return '复审中';
	} else if (value == 'COMPLETE') {
		return '已审核';
	}else if (value == 'CANCEL') {
		return '不通过';
	}
}
//格式化单据状态
function formatInstoreType(value, row, index) {
	if (value == '0') {
		return '采购入库';
	} else if (value == '1') {
		return '余料退回';
	} else {
		return '其他入库';
	}
}



//清除查询数据
function reValue(){
	  $("#searchfm").form("reset");
}
//查询
function search(){
	$('#dg').datagrid('load',{
		   docket_type:   $("#docket_type").combobox('getValue') ,
		  instore_type:   $("#instore_type").combobox('getValue')  ,
		  			id:   $("#id").val() ,
		 material_name:   $("#material_name").val() ,
		 supplier_name:   $("#supplier_name").val() ,
		        buy_id:   $("#buy_id").val() ,
		    date_begin:   $("#date_begin").datebox('getValue') ,
			  date_end:   $("#date_end").datebox('getValue') , 
	});
}
$.extend($.fn.validatebox.defaults.rules, {   
  	smallerThan: {   
          validator: function(value,param){
        	  return parseInt(value) <= param[0] && parseInt(value) > 0 ;
          },   
          message: '入库数量只能小于执行采购的数量'  
      }   
  });  
function initRowsFromData(data){
	
	emptyTable();
	var index=0;
	var totalInstoreNum=0;
	var docket_type=data[0].docket_type;
	  var token = 'readonly=\"true\"' ;
	  if(getEditable(docket_type)){
		  token = "";
	  }
	  getShowBut(docket_type);
	 $.each(data, function(i, item){
		 $("#instore_id").val(item.id);
		 $(".search-info #docket_typeN").val(formatDocketType(item.docket_type));
		 $(".search-info #docket_type").val(item.docket_type);
		 $(".search-info #buy_id").val(item.buy_id);
		 $(".search-info #instore_typeN").val(formatInstoreType(item.instore_type));
		 $(".search-info #instore_type").val(item.instore_type);
		 $(".search-info #warehouse_typeN").val(warehouseTypeFormatter(item.warehouse_type));
		 $(".search-info #warehouse_type").val(item.warehouse_type);
		 $(".search-info #supplier_id").val(item.supplier_id);
		 $(".search-info #supplier_name").val(item.supplier_name);
		 $(".search-info #instore_date").val(item.instore_date);
		 var temp = $("#tab tr");
			var currentRow = "items["+index+"]";
			var trid = new Date().getTime();
			var html = "<tr id="+ trid + ">"+  
			"<td><input class='text01' type='text' value="+ item.material_id+" name='"+ currentRow +".material_id'  readonly=\"true\"/></td>"+
			"<td><input readonly=\"true\"   value="+ item.material_name+" type='text' /></td>"+
			"<td><input readonly=\"true\" value="+ item.brand_name+" class='text01' type='text'  /></td>"+
			"<td><input readonly=\"true\" value="+ item.material_value+" class='text01' type='text'  /></td>"+
			"<td><input readonly=\"true\" value="+ item.unit+" class='text01' type='text'   /></td>"+
			"<td><input readonly=\"true\" value="+ item.position+" class='text01' type='text' /></td>"+
			"<td><input readonly=\"true\" value="+ item.do_buy_num+" class='text01' type='text' id='mt_wait_instore_num_"+ trid +"'  name='"+ currentRow +".do_buy_num'/></td>"+
			"<td><input "+ token + " value="+ item.instore_num+" class='text01' type='text'  name='"+ currentRow +".instore_num'  id='mt_instore_num_"+ trid +"'/></td>"+
			"</tr>";
			
			$("#totalRow").before(html);
			
			 var pn =  parseFloat(item.instore_num);
			 totalInstoreNum+=pn;
			 
			 if(getEditable(docket_type)){
					//添加验证
					$('#mt_instore_num_'+trid).numberbox({
						required:true ,
						validType: "smallerThan['"+item.do_buy_num+"']" ,
						onChange:function(a,b){
							$(".dataintable").trigger("dataChange");
						}
					});
			 }
			 
			index++;
	  });
	
	 $("#totalRow #totalInstoreNum").text(totalInstoreNum);
}

function updateInstore(param){
	$(".search-info #updateType").val(param);
		 $("#fm").form("submit",{
		url :  root +'/wmsinstore/doUpdateFromInstore.do',
		data:{type:param} ,		
				success:function(res){
					res = JSON.parse(res);
					if(res.code == '0000'){
						$.messager.alert("系统提示","保存成功") ;
						 $("#materialdlg").dialog("close");
						 $('#dg').datagrid("reload");
					}else{
						$.messager.alert("系统提示",res.msg);
						 $("#materialdlg").dialog("close");
						 $('#dg').datagrid("reload");
						
					}
				}
		 });
}


function emptyTable(){
	$(".dataintable tbody tr").not(":last").each(function(index, element){
		 $(element).remove() ;
	});
}

function getEditable(str){
	if("FIRSTAUDITING" == str || "CANCEL" == str){
		return true;
	}
	return false;
}

function getShowBut(str){
	if("FIRSTAUDITING"==str){
		$("#reauditing").css("display","none");
	}else if('COMPLETE'== str){
		   $("#bt").css("display","none");
		   
	}else if("REAUDITING"==str){
		 $("#firstauditing").css("display","none");
		 $("#reauditing").css("display","");
		   $("#editA").css("display","none");
		   $("#delA").css("display","none");
	}else if("CANCEL"==str){
		$("#reauditing").css("display","none");
		   $("#editA").css("display","");
		   $("#delA").css("display","");
	}
}



function getCTime(){
	  var myDate = new Date();
    var year = myDate.getFullYear();
    var month = myDate.getMonth() + 1;
    var day=myDate.getDate();
   return year+"-"+month+"-"+day ;
}