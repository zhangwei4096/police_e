var page=1, pageSize=10;

//分页查询
function init(){
	$("#infos").css("display","block");
	$("#infos").datagrid({
		url : root + "/user/listBillGoods",
		pageNumber : page,    //初始化页数
		pageSize : pageSize,  //每页显示记录条数
		pageList : [10,20,50], // 设置每页显示多少条
		singleSelect : false,
		fitColumns : true,
		collapsible : true,
		pagination : true,
		striped : true,
		height : "auto",
		onBeforeLoad : function(param){
			var options = $("#infos").datagrid("options");
			page = options.pageNumber;
			pageSize = options.pageSize;
			param.first = (page-1)*pageSize;
			param.last = pageSize;
			//****搜索条件设置
				   param.designName = $("#designName").val();
				   param.brandName = $("#brandName").val();
				   param.shopName = $("#shopName").val();
				   param.modelName = $("#modelName").val();
		}
	});
}


function optFormater(value, rowData, rowIndex) {
	var staticsId = rowData.staticsId;
	if(staticsId == null||staticsId == ""){
		return "";
	}
	return 	"<a href=\""+root+"/user/goUpdateBillGoods/"+staticsId+"\" class=\"icon icon-edit\" title=\"编辑\"></a>  "+
            "<a href=\""+root+"/user/deleteBillGoods/"+staticsId+"\" onclick=\"return confirm('确定删除此条数据？');\" class=\"icon icon-cancel\" title=\"删除\"></a> ";
}


function search(){
	page = 1;//初始化页数,防止在非第一页搜索之后还停留在那一页上
	init();
}

//重置搜索
function reset(){
	$('#searchForm').form('clear');
	init();
}

//初始化查询条件控件和验证
$(document).ready(function(){

	
	
	
	
	
	init();
});