var url;

//初始化角色Panel
function init(){
	$("#rolePanel").html("");
	$.ajax({
		url: root + '/role/queryAllRoles.do',
		success:function(res){
			if(res.code == '0000'){
				$.each(res.data ,function(index,element){
					var h = '<div class="checkboxitem"  data-index="'+ element.id +'"><label>'+ element.description + '</label><input  type="checkbox" /></div>'
					$("#rolePanel").append( h );
				}) ;
			}
		}
	});
	
	
	
	
}

//重置表单
function resetValue(){
	$("#fm").form('reset');
}

//获取已经checked的 Id
function getCheckedId(){
	var array= new Array();
	$("#fm input:checked").each(function(index,element ){
		 var value = $(this).parent(".checkboxitem").attr("data-index") ;
		 console.log(value) ;
		 array.push(value) ;
	});
	console.log( array.join(',') );
	return array.join(',');
}

//初始化 check
function initCheckId(ids){
	var list = ids.split(",");
	$.each(list, function (index, element){
		$("#fm [data-index="+ element +"] input:checkbox").prop("checked",true);
	}) ;
}

//格式化状态
function statusFormatter(value, row){
	if('Y' == value){
		return "启用" ;
	}
	return "禁用" ;
}
 
function disableUsers(){
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length==0){
		$.messager.alert("系统提示","请选择要删除的数据！");
		return;
	}
	var strIds=[];
	for(var i=0;i<selectedRows.length;i++){
		strIds.push(selectedRows[i].userid);
	}
	
	var ids=strIds.join(",");
	$.messager.confirm("系统提示","您确认要删除这<font color=red>"+selectedRows.length+"</font>条数据吗？",function(r){
		if(r){
			$.post(root+"/user/disableUser.do",{userids:ids},function(result){
				if(result.code  == '0000'){
					$.messager.alert("系统提示","数据已成功删除！");
					$("#dg").datagrid("reload");
				}else{
					$.messager.alert("系统提示","数据删除失败！");
				}
			},"json");
		}
	});
}

//弹出新增对话框	
function openAddDialog(){
	$("#dlg").dialog("open").dialog("setTitle","添加用户");
	$('#fm #username').textbox('enable');
	resetValue();
	url = root + '/user/regist.do' ;
	$('#username').textbox('enable');	
}
//弹出修改对话框
function openModifyDialog(){
	resetValue();
	var selectedRows=$("#dg").datagrid('getSelections');
	if(selectedRows.length!=1){
		$.messager.alert("系统提示","请选择一条要编辑的数据！");
		return;
	}
	var row=selectedRows[0];
	$("#dlg").dialog("open").dialog("setTitle","编辑用户");
	$('#fm').form('load',row);
	initCheckId(row.role_ids) ;
	$('#fm #username').textbox('disable');	
	url = root + '/user/updateUserInfo.do' ;
}


//关闭对话框
function closeDialog(){
	$("#dlg").dialog("close");
	resetValue();
}
//保存 
function saveUser(){
	$("#role_ids").val(getCheckedId());
	$("#fm").form("submit",{
		url:url ,
		onSubmit:function(){
			return $(this).form("validate");
		},
		success:function(result){
			res = JSON.parse(result);
			if(res.code == '0000'){
				$.messager.alert("系统提示","保存成功","info",function(){
					closeDialog();
					$("#dg").datagrid("reload") ;
				});
			}else{
				$.messager.alert("系统提示",res.msg ,"info",function(){
					closeDialog();
					$("#dg").datagrid("reload") ;
				});
				return;
			}
		}
	});
}

	
//初始化表格
$(document).ready(function(){
	init();
	
	$('#dg').datagrid({
		onBeforeLoad:function(param){
			param.realName =  $("#realName").val();
			param.username =   $("#username").val();
		}
	});
});
	