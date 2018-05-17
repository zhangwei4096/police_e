function getCurrentDateTime(){
	 var date=new Date();
	 var year=date.getFullYear();
	 var month=date.getMonth()+1;
	 var day=date.getDate();
	 var hours=date.getHours();
	 var minutes=date.getMinutes();
	 var seconds=date.getSeconds();
	 return year+"-"+formatZero(month)+"-"+formatZero(day)+" "+formatZero(hours)+":"+formatZero(minutes)+":"+formatZero(seconds);
 }

function getCurrentDate(){
	 var date=new Date();
	 var year=date.getFullYear();
	 var month=date.getMonth()+1;
	 var day=date.getDate();
	 return year+"-"+formatZero(month)+"-"+formatZero(day);
}


function formatZero(n){
	 if(n>=0&&n<=9){
		 return "0"+n;
	 }else{
		 return n;
	 }
}
$.extend($.fn.form.methods, {
	myLoad : function (jq, param) {
		return jq.each(function () {
			load(this, param);
		});

		function load(target, param) {
			if (!$.data(target, "form")) {
				$.data(target, "form", {
					options : $.extend({}, $.fn.form.defaults)
				});
			}
			var options = $.data(target, "form").options;
			if (typeof param == "string") {
				var params = {};
				if (options.onBeforeLoad.call(target, params) == false) {
					return;
				}
				$.ajax({
					url : param,
					data : params,
					dataType : "json",
					success : function (rsp) {
						loadData(rsp);
					},
					error : function () {
						options.onLoadError.apply(target, arguments);
					}
				});
			} else {
				loadData(param);
			}
			function loadData(dd) {
				var form = $(target);
				var formFields = form.find("input[name],select[name],textarea[name]");
				formFields.each(function(){
					var name = this.name;
					var value = jQuery.proxy(function(){try{return eval('this.'+name);}catch(e){return "";}},dd)();
					var rr = setNormalVal(name,value);
					if (!rr.length) {
						var f = form.find("input[numberboxName=\"" + name + "\"]");
						if (f.length) {
							f.numberbox("setValue", value);
						} else {
							$("input[name=\"" + name + "\"]", form).val(value);
							$("textarea[name=\"" + name + "\"]", form).val(value);
							$("select[name=\"" + name + "\"]", form).val(value);
						}
					}
					setPlugsVal(name,value);
				});
				options.onLoadSuccess.call(target, dd);
				$(target).form("validate");
			};
			function setNormalVal(key, val) {
				var rr = $(target).find("input[name=\"" + key + "\"][type=radio], input[name=\"" + key + "\"][type=checkbox]");
				rr._propAttr("checked", false);
				rr.each(function () {
					var f = $(this);
					if (f.val() == String(val) || $.inArray(f.val(), val) >= 0) {
						f._propAttr("checked", true);
					}
				});
				return rr;
			};
			function setPlugsVal(key, val) {
				var form = $(target);
				var cc = ["combobox", "combotree", "combogrid", "datetimebox", "datebox", "combo"];
				var c = form.find("[comboName=\"" + key + "\"]");
				if (c.length) {
					for (var i = 0; i < cc.length; i++) {
						var combo = cc[i];
						if (c.hasClass(combo + "-f")) {
							if (c[combo]("options").multiple) {
								c[combo]("setValues", val);
							} else {
								c[combo]("setValue", val);
							}
							return;
						}
					}
				}
			};
		};
	}
});
//页面初始化展示下拉框选择状态
$(function(){  
	$("select#status").prepend("<option value=''>请选择</option>"); 
	$("select#status").append("<option value='1'>正常</option>");  //添加一项option
	$("select#status").append("<option value='0'>锁定</option>");  //添加一项option
});  
function formatStatus(value,row,index){
	if (value==1){
		return '正常';
	} else {
		return '锁定';
	}
}


//批量删除
function deleteRows(url){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].id);
	}
	var ids=strIds.join(",");
	
	$.messager.confirm("系统提示","您确认要删除这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post(url,{ids:ids},function(res){
					if(res.code == '0000'){
					$.messager.alert("系统提示","数据已成功删除！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert("系统提示","数据删除失败！");
				}
			},"json");
		}
	});
	
}


//打开新增对话框
function openAddDialog( title  , url ){
	$("#dlg").dialog("open").dialog("setTitle",title);
	resetValue();
	window.submit_url  =  url ;
}
//弹出修改对话框
function openModifyDialog( title ,url ){
	resetValue();
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle", title);
	$('#fm').form('load',row);
	window.submit_url  =  url ;
}
//重置表单
function resetValue(){
	$("#fm").form('reset');
	$("#fm [type='hidden']").val("");
}


//关闭对话框
function closeDialog(){
	$("#dlg").dialog("close");
	resetValue();
}

//保存
function save(){
	$("#fm").form("submit",{
		url:window.submit_url ,
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
			}else if(res.code == '0003'){
				$.messager.alert("系统提示",res.msg ,"info",function(){
				});
				return;
			}else{
				$.messager.alert("系统提示",res.msg ,"info",function(){
					closeDialog();
				});
				return;
			}
		}
	});
}

//根据ID 删除数据
function deleteById(url){

	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要删除的的数据！");
		return;
	}
	var row=selectedRows[0];
	$.ajax({
		url:url,
		data:row,
		success:function(e){
			$.messager.alert("系统提示","删除成功","info",function(){
				$('#dg').datagrid('reload');
			});
		},error:function(e){
			alert(e.message);
		}
	});
}

function zeroFormatter(value, rowData, rowIndex) {
	if(value == null){
		return "0" ;
	}
	return value ;
}

function resetSearchForm(){
	$("#searchfm").form("reset");
}
function commonSearch(){
	$('#dg').datagrid('load'); 
}

function warehouseTypeFormatter(value, row){
	console.log (value);
	console.log (row);
	   if("1" == row.usertype){
		   return "良品仓";
	   }
	   if("2" == value){
		   return "报损仓";
	   }
	   return "dd";
	}
function transportStyleFormatter(value, row){
	   if("1" == value){
		   return "送货上门";
	   }
	   if("2" == value){
		   return "上门自取";
	   }
	   return "";
	}

 
 function isMainFormatter(value, row){
	 console.log(value) ;
	 console.log(row) ;
		if("1" == value){
		    return "普通用户";
		}
	 	if("2" == value){
		    return "认证设计师";
		}
	}
 
 function materialStatusFormatter( value, row){
	 console.log(value) ;
 	      if("1" == value){
			   return "正常";
		   }
		   if("0" == value){
			   return "锁定";
		   }
		   return "";
  }
 function docFormatter( value, row){
	 	if("DOC01" == value){
		    return "采购入库";
		}
	 	if("DOC02" == value){
		    return "余料退回";
		}
	 	if("DOC03" == value){
		    return "其他入库";
		}
	 	if("DOC04" == value){
		    return "项目领用";
		}
	 	if("DOC05" == value){
		    return "其他出库";
		}
	 	if("DOC06" == value){
		    return "退货出库";
		}
	 	if("DOC07" == value){
		    return "库内移仓";
		}
		if("DOC08" == value){
		    return "报损出库";
		}
		 return "";
 }
 
 function pdFormatter( value, row){
	 	if("OPEN" == value){
		    return "打开";
		}
	 	if("CLOSED" == value){
		    return "关闭";
		}
	 	if("CHECKING" == value){
		    return "盘点中";
		}
	 	if("FIRSTAUDITING" == value){
		    return "初审中";
		}
	 	if("REAUDITING" == value){
		    return "复审中";
		}
	 	if("COMPLETE" == value){
		    return "已完成";
		}
		return "";
 }
 function closeMyDig(){
		$("#materialdlg").dialog("close");
 }

 function printdiv(printpage){
		var headstr = "<html><head><title></title></head><body style='overflow-y:auto;height:auto;'>";
		var footstr = "</body>";
		var newstr = document.all.item(printpage).innerHTML;
		var oldstr = document.body.innerHTML;
		document.body.innerHTML = headstr+newstr+footstr;
		window.print(); 
	    document.body.innerHTML = oldstr;
		return false;
}
 
//以下是自己定义的方法
    
function message(infos){
	//信息提示框 右下角
        if(!infos){
         $.messager.show({
                title:'警告',
                msg:'请选择需要操作的数据！'
            });
        }else{
            $.messager.show({
                title:'提示',
                msg:''+ infos +''
            });
        }
    }