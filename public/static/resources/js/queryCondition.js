$(function(){ 
	  $('#brand_id').combobox({   
 	     url:'../wmsBrand/getBrand.do',   
          editable:true, //只能下拉选择
          cache: false,  
          panelHeight: 'auto',  
          width:100,
          valueField:'brand_id',     
          textField:'brand_name'
	}); 
	  
	  $('#transport_style').combobox({
			 width:90,
			 panelHeight: 'auto', 
			 data: [ {   
					    "value":'',   
					    "text":"全部"  
					},{   
					    "value":1,   
					    "text":"送货上门"  
					},{   
					    "value":2,   
					    "text":"上门自取"  
					}]  
		 }); 
	  
});
function reValue(){
	  $("#searchfm").form("reset");
}

function formatRelation(value, rowData, rowIndex) {
	 if (2==value){
			return '默认';
		} else if(1==value) {
			return '关联';
		}else{
			return '无关';
		}
}

