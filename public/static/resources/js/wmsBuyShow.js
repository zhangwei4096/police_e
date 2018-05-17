  $(document).ready(function(){
	  
	     
	  $("#dg").datagrid({
		  "onDblClickRow" : function(index, row){
			  
			  alert(row.buy_id);
			  showDitail(row.buy_id);
		 }
		
	  });
		  
	  //初始化查询选项-采购状态
	 $('#cg_status').combobox({
			 width:90,
			 panelHeight: 'auto', 
				data:  [ {   
				    "value":'',   
				    "text":"全部"  
				},{   
				    "value":1,   
				    "text":"待采购"  
				},{   
				    "value":2,   
				    "text":"采购中"  
				},{   
				    "value":3,   
				    "text":"已完成"  
				},{   
				    "value":4,   
				    "text":"已关闭"  
				}]  
	 });
	 
	  //初始化查询选项-采购状态
	 $('#date_style').combobox({
		 width:82,
		 panelHeight: 'auto', 
		 data: [ {   
				    "value":0,   
				    "text":"送货日期"  
				},{   
				    "value":1,   
				    "text":"采购日期"  
				}]
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
	 
	 
	 
	 
});//end ready
  
  
 //格式化采购状态  
function formatCgStatus(value,row,index){
	if (value==1){
	    return '待采购';
	} else if(value==2) {
		return '采购中';
	}else if(value==3) {
		return '已完成';
	}
}

//查询
function search(){
	var date_style= $('#date_style').combobox('getValue');
	if(''==date_style){
		date_style="0";
	}
	$('#dg').datagrid('load',{
		"buy_id":   $("#buy_id").val() ,
		    "cg_status":$('#cg_status').combobox('getValue'),
		    "material_name":   $("#material_name").val() ,
		    "supplier_name":   $("#supplier_name").val() ,
		    "date_style":date_style,
		    "date_begin":   $("#usedate1").datebox('getValue') ,
		    "date_end":   $("#usedate2").datebox('getValue') ,
		    "transport_add":   $("#transport_add").val() ,
		    "transport_style": $("#transport_style").datebox('getValue') 
	});
}




 
function showDitail(buy_id){
	var totalBuyNum=0;
	$("#materialdlg").dialog("open").dialog("setTitle",'申购单');
	$(".dataintable tbody tr").not(":last").each(function(index, element){
		 $(element).remove() ;
	});
	  $.ajax({
			url:  root +'/wmsbuy/queryForPage.do',
			data: {buy_id:buy_id} ,
			success:function(result){
				if(result.total>0){
					 $.each(result.rows, function(i, item){
					   $("#xbuy_id").val(item.buy_id);
					   $("#supplier_id").val(item.supplier_id);
					   $("#xsupplier_name").val(item.supplier_name);
					   $("#buy_date").val(item.buy_date);
					var html = "<tr>"+
					"<td class='text-1'>"+item.material_id+"</td>"+
					"<td class='text-1'>"+item.material_name+"</td>"+
					"<td class='text-1'>"+item.brand_name+"</td>"+
					"<td class='text00'>"+item.material_value+"</td>"+
					"<td class='text-1'>"+item.unit+"</td>"+
					"<td class='text-1'>"+item.do_buy_num+"</td>"+
					"<td class='text-1'>"+item.arrival_date+"</td>"+
					"<td class='text-1'>"+item.transport_style+"</td>"+
					"<td class='text-1'>"+item.transport_add+"</td>"+
					"<td class='text-1'>"+item.contact_person+"</td>"+
					"<td class='text-0'>"+item.contact_tel+"</td>"+
					"</tr>";
						 $("#totalRow").before(html);
						
						 var pn =  parseFloat(item.do_buy_num);
						 totalBuyNum+=pn;
						 $("#totalRow #totalBuyNum").text(totalBuyNum);
						 
					  });
				
				}
			}
	  });
}
