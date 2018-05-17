$(document).ready(function() {

	// 初始化显示页面
	$("#dg").datagrid({
		onBeforeLoad:function(param){
			param.sg_status = "1" ;
		}
	
	});
	//数据变更更新合计
	$(".dataintable").bind("dataChange" ,function(e){
		 var totalBuyNum = 0 ;  
		 $.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
			 var buyNum =  $(this).find("td:eq(13) input").val() + "" ;
			 if(buyNum.trim()== ""){
				 buyNum = 0 ;
			 }
			 var bn =  parseFloat(buyNum);
			 totalBuyNum+=bn;
		 });
		 

		 $("#totalRow #totalBuyNum").text(totalBuyNum);
	});
	$('#sg_source').combobox({
		width : 90,
		panelHeight : 'auto',
		data : [ {
			"value" : '',
			"text" : "全部"
		}, {
			"value" : 1,
			"text" : "手动创建"
		}, {
			"value" : 2,
			"text" : "补充库存"
		}, {
			"value" : 3,
			"text" : "库存(直供)"
		} ]
	});
	// 初始化查询选项-采购状态
	$('#date_style').combobox({
		width : 82,
		panelHeight : 'auto',
		data : [ {
			"value" : 0,
			"text" : "送货日期"
		}, {
			"value" : 1,
			"text" : "采购日期"
		} ]
	});

	$('#transport_style').combobox({
		width : 90,
		panelHeight : 'auto',
		data : [ {
			"value" : '',
			"text" : "全部"
		}, {
			"value" : 1,
			"text" : "送货上门"
		}, {
			"value" : 2,
			"text" : "上门自取"
		} ]
	});

});// end ready



// 格式化采购状态
function formatCgStatus(value, row, index) {
	if (value == 1) {
		return '待采购';
	} else if (value == 2) {
		return '采购中';
	} else if (value == 3) {
		return '已完成';
	}
}

// 格式化采购状态
function formatSgStatus(value, row, index) {
	if (value == 1) {
		return '手动创建';
	} else if (value == 2) {
		return '补充库存';
	} else {
		return '库存(直供)';
	}
}
// 查询
function search() {

	$('#dg').datagrid('load', {

		"sg_source" : $('#sg_source').combobox('getValue'),
		"material_name" : $("#material_name").val(),
		"supplier_name" : $("#supplier_name").val(),
		"date_style" : "0",
		"date_begin" : $("#usedate1").datebox('getValue'),
		"date_end" : $("#usedate2").datebox('getValue'),
		"transport_add" : $("#transport_add").val()

	});
}

function clearOpenDlg() {
	resetValue();
	$(".dataintable tbody tr ").not(":last").remove();
}


//验证输入的供货商是否一直,不一致不能提交
$.extend($.fn.validatebox.defaults.rules, {   
	rowNotEqual: {   
        validator: function(value,param){
        	var res = true ;
        	alert(value);
        	
        	$.each( $(".dataintable tbody tr ").not(":last"), function(index, element){
        		alert($("input[name='items[0].supplier_id']").val());
         	   /*  if(material_id ==  value){
         	    	 res = false;
         	     }*/
        	 });
        	
             return res;   
        },   
        message: '出库物料重复'  
    }   
}); 


$.extend($.fn.validatebox.defaults.rules, {   
  	smallerThan: {   
          validator: function(value,param){
        console.log(param);
        
        	return parseInt(value) <= (param[0]-param[1]) && parseInt(value) > 0 ;
       
        	  
          },   
          message: '采购数量要小于执行申购数量并且小于已采购的数量'  
      }   
  });  



function showDitail() {

	var falg = 0;

	$("#materialdlg").dialog("open").dialog("setTitle", '出库单');
	clearOpenDlg();
	var selectedRows = $("#dg").datagrid('getSelections');
	if (selectedRows.length == 0) {
		$.messager.alert("系统提示", "请选择要生存采购单的数据！");
		return;
	}
	var totalBuyNum = 0;
	$("#materialdlg").dialog("open").dialog("setTitle", '申购单');
	$(".dataintable tbody tr").not(":last").each(function(index, element) {
		$(element).remove();
	});

	for (var i = 0; i < selectedRows.length; i++) {
		var data = selectedRows[i];
		

		/*
		 * if(null==selectedRows[i].supplier_name){
		 * $.messager.alert("系统提示","供应商不能为空"); return; }
		 */
		/*
		 * if (selectedRows[i].supplier_name==selectedRows[i+1].supplier_name){
		 * 
		 * $.messager.alert("系统提示","所选数据供应商不一致,请重新选择"); return;
		 *  }
		 */

		var trId = "items[" + falg + "]";
		var mt = new Date().getTime();

		var html = "<tr id="+ mt+ ">"
				+ "<td><input value="+ data.id+ " class='text00' readonly=\"true\" type='text' name='"+ trId+ ".purchase_id' />"
				+ "<td><input value="+ data.material_id+ " class='text00' readonly=\"true\" type='text' name='"+ trId+ ".material_id' id='trId_material_id_"+ mt+ "'/>"
				+ "<td><input  value="+ data.material_name+ " readonly=\"true\" class='text-1' type='text' />"
				+ "<td><input  value="+ data.brand_name+ "  readonly=\"true\" class='text-1' type='text'    />"
				+ "<td><input  value="+ data.material_value+ "  readonly=\"true\" class='text02' type='text'     />"
				+ "<td><input  value="+ data.unit+ " readonly=\"true\" class='text-1' type='text'    />"
				+ "<td><input  value="+ data.arrival_date+ " readonly=\"true\" class='text-0' type='text'   name='"+ trId+ ".arrival_date' id='trId_arrival_date_"+ mt+ "'/>"
				+ "<td><input  value="+ data.transport_style+ " readonly=\"true\" class='text-0' type='text'   name='"+ trId+ ".transport_style'/>"
				+ "<td style='display:none'><input  value="+ data.transport_id+ " readonly=\"true\" class='text-2' type='text'  name='"+ trId+ ".transport_id'/>"
				+ "<td><input  value="+ data.transport_add+ " readonly=\"true\" class='text-2' type='text'  name='"+ trId+ ".transport_add'/>"
				+ "<td><input  value="+ data.contact_person+ " readonly=\"true\" class='text-0' type='text'     name='"+ trId+ ".contact_person'/>"
				+ "<td><input  value="+ data.contact_tel+ " readonly=\"true\" class='text-0' type='text'   name='"+ trId+ ".contact_tel'/>"
				
				+ "<td><input  class='text-1' value="+ data.do_purchase_num+ " readonly=\"true\" class='text-0' type='text' id='trId_do_purchase_num_"+ mt+ "'  name='"+ trId+ ".do_purchase_num'/>"
				+ "<td><input class='easyui-numberbox text-1'    name='"+ trId+ ".buy_num' id='trId_buy_num_"+ mt+ "'/>"
				
				+"<td><input class='easyui-combobox' data-options='width:100'  name='"+trId+".supplier_id'   id='trId_supplier_id_"+mt+"'/>"
				
				+ "<td style='display:none'><input  value="+ data.purchase_num+ " readonly=\"true\" class='text-2' type='text'  name='"+ trId+ ".purchase_num'/>"
				+ "<td><input type=\"button\" class=\"icon-delete\" title=\"删除\" style=\"width:20px;\" onclick=\"deltr("+ mt + ")\">" + "</tr>";
		$("#totalRow").before(html);
		//添加验证
		$('#trId_buy_num_'+mt).numberbox({
			required:true ,
			validType: "smallerThan['"+data.do_purchase_num+"','"+data.buy_num+"']" ,
			onChange:function(a,b){
				$(".dataintable").trigger("dataChange");
			}
		});
	
		var material_id=$('#trId_material_id_'+mt).val();
		$('#trId_supplier_id_'+mt).combobox({
			url : root + '/wmssupmaterial/getSupMaterial.do?material_id='+material_id,
			editable : true,
			required : true,
			//validType: "rowNotEqual['trId_supplier_id_'+"+ mt +"]" ,
			panelHeight : 'auto',
			valueField : 'supplier_id',
			textField : 'supplier_name',
		
			onSelect : function(rec) {
				console.log(rec);
				
				 $(this).combobox('setValue',rec.supplier_id);
				

			},
			onLoadSuccess : function() {
			/*	var data = $('#trId_supplier_name_'+mt).combobox('getData');
				if (data.length == 0) {
					
					 * $('#dg').datagrid("unselectRow", index);
					 * 
					 * $.messager.alert("系统提示","该行无供货商可以设置,请到【商家管理>>供货商管理界面设置物料关联】");
					 * $('#dg').datagrid("endEdit", index);
					 
				}*/
			}
		});
		
		falg++;
		orderedTr();
	}
}

// 保存之前对TR排序
function orderedTr() {
	$(".dataintable tbody tr").each(
			function(index, element) {
				$(element).find("td:eq(1) input").attr("name",
						"items[" + index + "].material_id");

			});
}
function deltr(mt) {

	$("#" + mt).remove();
	orderedTr();
	var totalBuyNum = 0;
	$(".dataintable").trigger("dataChange");
}

function insertBuy() {

	if ($(".dataintable").find("tr").length < 1) {
		$.messager.alert("系统提示", "采购明细不能小于1条");
		return;
	}

	$.messager.confirm("系统提示", "确认提交该采购单吗?", function(r) {
		if (r) {
			$("#fm").form("submit", {
				url : root + '/wmsbuy/save.do',

				success : function(result) {

					res = JSON.parse(result);
					if (res.code == '0000') {
						$.messager.alert("系统提示", "保存成功", "info", function() {
							$("#materialdlg").dialog("close");
							$('#dg').datagrid('reload');
							closeDialog();
						});
					} else {
						$.messager.alert("系统提示", res.msg, "info", function() {
							closeDialog();
						});
						return;
					}
				}
			});
		}
	});
}

function closeBuy() {
	$("#materialdlg").dialog("close");
}
