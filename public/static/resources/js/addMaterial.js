$(function() {    
	      // 下拉框选择控件，下拉框的内容是动态查询数据库信息   
	      $('#brand_id').combobox({   
	             url: root +'/wmsBrand/getBrand.do',   
	             editable:false, //只能下拉选择
                 cache: false,  
	             panelHeight: 'auto',  
	             valueField:'brand_id',     
	             textField:'brand_name'
		  }); 
	     
	     
	      //初始化类型下拉框
		  $('#type_id').combobox({ 
	          url:root +'/materialType/getMaterialType.do',   
	          editable:false, //只能下拉选择
	          cache: false,  
	          panelHeight: 'auto',  
	          valueField:'type_id',     
	          textField:'type_name', 
	          selectOnNavigation:true,
	        
	          onSelect:function(rec){    
	                var url = root +'/materialname/getMaterialName.do?typeId='+rec.type_id;
	                  
	                $.ajax({
		  	              type: "POST",
		  	              url: url,
		  	              cache: false,
		  	              dataType : "json",
		  	              success: function(data){
		  	            	
		  		            $("#name_id").combobox("setValue",'');//在选择类别的时候 清空名称的输入值
			                $("#jAttrTable tr").remove();//每次名称变更的时候都要重新加载其属性
			                $('#name_id').combobox('reload', url); 
		  	            	  if(data.length<1){
		  	            		  $('#materialSave').attr("disabled",true); 
		  	            		 
		  	            		  $.messager.alert("系统提示","该物料没有名称,请到【物料属性】页面添加名称!");
		  	  					return false;	
		  	            	  }else{
		  	            		  $('#materialSave').attr("disabled",false); 
		  	            	  }
		  	              },
	                });    
	        		
		  		        	
		  	              
	          } ,
		  });    
		
	    // 下拉框选择控件，下拉框的内容是动态查询数据库信息   
	     $('#name_id').combobox({ 
            editable:false, //只能下拉选择
            cache: false,  
            panelHeight: 'auto',  
            valueField:'nameId',     
            textField:'materialName', 
            selectOnNavigation:true,
            onSelect:function(rec){   
	            $.ajax({
	              type: "POST",
	              url: root +"/attribute/getAttributes.do?nameId="+rec.nameId,
	              cache: false,
	              dataType : "json",
	              success: function(data){
	            	  var type_id=$('#type_id').combobox('getValue');
		              $("#jAttrTable tr").remove();//每次名称变更的时候都要重新加载其属性
	            	  if(data.length<1){
	            		  $('#materialSave').attr("disabled",true); 
	            		 
	            		  $.messager.alert("系统提示","该物料没有属性,请到【物料属性】页面添加属性!");
	  					return false;	
	            	  }else{
	            		  $('#materialSave').attr("disabled",false); 
	            	  }
	            	
		              var attr_id=[];
		              var attr_name=[];
		        	  $.each(data, function(i, item){ 
		        	  attr_id.push(item.attrId);
		        	  attr_name.push(item.attrName);
						var attrId=item.attrId;
		          	      $("#jAttrTable").append('<tr>  <td>&nbsp;'+item.attrName+'&nbsp;</td><td>&nbsp;<input id='+attrId+' class="attrValue"/><input  type="button" disabled="true"  class='+attrId+' id='+attrId+' name='+item.attrName+' style="height:19px" value="保存" onclick="javascript:attrSave(this);"/></td></tr>');
		          	      $('#'+attrId).combobox({ 
		          	      url:root +'/attrValue/getAttrValue.do?type_id='+type_id+'&name_id='+rec.nameId+'&attr_id='+attrId, 
		          	    		 
		 	             editable:true, 
		                  cache: false,  
		 	             panelHeight: 160,  
		 	             valueField:'id',     
		 	             textField:'attr_value',
		 	            onChange:function(){

		 	      		 	var opts=$('#'+attrId).combobox('options'); 
		 	      		   	var value=$('#'+attrId).combobox('getText');
		 	      		    	var data = $('#'+attrId).combobox('getData'); 
		 	      		   	var isExist= false;
		 	      		 	for(var i=0; i<data.length; i++){
		 	      		 		if ((data[i][opts.textField] ==value)){
		 	      		 			isExist=true;
		 	      		 		}
		 	      		 	}
		 	      		     if(!isExist&value.length>0){
		 	      		    	$("."+attrId).attr("disabled",false); 
		 	      		     }else{
		 	      		     	$("."+attrId).attr("disabled",true); 
		 	      		     }
		 	            }, 
		          	    });
		        	  
		        	  });  
		        	  attr_id=attr_id.join(",");
		        	  attr_name=attr_name.join(",");
		    
						 $("#jAttrTable").append('<tr style="display:none"><td></td><td>&nbsp;<input class="easyui-textbox" id="attr_id" name="attr_id" value='+attr_id+'></td></tr>');
						 $("#jAttrTable").append('<tr style="display:none"><td></td><td>&nbsp;<input class="easyui-textbox" id="attr_name"  name="attr_name" value='+attr_name+'></td></tr>');
						 $("#jAttrTable").append('<tr style="display:none"><td></td><td>&nbsp;<input class="easyui-textbox" id="attr_value_id"  name="attr_value_id"></td></tr>');
						 $("#jAttrTable").append('<tr style="display:none"><td></td><td>&nbsp;<input class="easyui-textbox" id="attr_value"  name="attr_value"></td></tr>');
           		  		}
       				}
 				);
	        } ,
		});    
	    
	     // 库位下拉框选择控件，下拉框的内容是动态查询数据库信息   
	      $('#position').combobox({   
	             url: root +'/shelves/getShelves.do',   
	             editable:false, //只能下拉选择
                cache: false,  
	             panelHeight: 'auto',  
	             valueField:'shelve_id',     
	             textField:'shelve_id',
	             multiple:true,
		  }); 
	      
	     $('#materialSave').click(function(){
	    	 
	    	 var type_id= $('#type_id').combobox('getValue');
	    	 if(''==type_id){
				 $.messager.alert("系统提示","请选择物料类别");
					return false;	
			}
	    	 
	    	 var name_id= $('#name_id').combobox('getValue');
	    	 if(''==name_id){
				 $.messager.alert("系统提示","请选择物料名称");
					return false;	
			}
	    	 
	 		var attr_id= $("#attr_id").val();
	 		alert(attr_id);
	 		var strs=attr_id.split(","); //字符分割 
			var attrValue=[];//属性值
			var attrValueId=[];//属性值id
			for(var i=0;i<strs.length;i++){
				var cssValue =$('.'+strs[i]).attr('disabled');
				if(undefined==cssValue){
					 $.messager.alert("系统提示","请先保存属性");
					return false;
				}
				var true_id=$('#'+strs[i]).combobox('getValue'); //定义选择的属性的id
				var true_value=$('#'+strs[i]).combobox('getText'); //定义选择的属性的id
				if(''==true_id){
					 $.messager.alert("系统提示","属性值不能为空");
						return false;	
				}
				attrValueId.push(true_id);
				attrValue.push(true_value);
			}
			$('#attr_value_id').val(attrValueId);
			$('#attr_value').val(attrValue);
			var safe_stockl=$('#safe_stockl').val();
			var safe_stockh=$('#safe_stockh').val();
			if(safe_stockl>safe_stockh){
				 $.messager.alert("系统提示","安全库存范围有误");
					return false;	
			}
			
			 $("#fm").form("submit",{
				 
					url:root +'/warehouse/doSaveMaterial.do',
					onSubmit:function(){
						return $(this).form("validate");
					},
					success:function(result){
					
						var result=eval('('+result+')');
						if(result.code=='0000'){
							$.messager.alert("系统提示","保存成功");
							resetValue();
							
						}else if(result.code=='0001'){
							$.messager.alert("系统提示","保存失败,该物料已存在");
							
						}else{
							$.messager.alert("系统提示","保存失败");
							return;
						}
					}
				});
			 
		 });
	    
	});
	
	 

	function rtrim(s) { 
	var lastIndex = s.lastIndexOf(',');
	     if (lastIndex > -1) {
	         s = s.substring(0, lastIndex);

	    }
	     return s;
	}

	//重置表单
	function resetTable(){
		$("#fm").form('reset');
		$("#fm [type='hidden']").val("");
		 $("#jAttrTable input:button").attr("disabled",true);
		
		
	}

	function attrSave(obj){
		var type_id=$('#type_id').combobox('getValue');
		var name_id=$('#name_id').combobox('getValue');
		var attr_id=obj.id;
		var attr_name=obj.name;
		var attr_value=$('#'+attr_id).combobox('getValue');
		 $.post(root +"/attrValue/doSaveAttrValue.do",{type_id:type_id,name_id:name_id,attr_id:attr_id,attr_name:attr_name,attr_value:attr_value},function(result){
				console.log(result);
			 if(result.code == '0000'){
				 $.messager.alert("系统提示","保存成功！");
				  $('#'+attr_id).combobox("setValue",'');//点击保存之后把输入的值清空,在后面保存物料的时候在判断是否有值 这样才能等到属性的id
				 $('#'+attr_id).combobox('reload', root +'/attrValue/getAttrValue.do?type_id='+type_id+'&name_id='+name_id+'&attr_id='+attr_id);    
			 }else{
				 $.messager.alert("系统提示","保存失败！");
			}
		},"json"); 

	}