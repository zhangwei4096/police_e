//扩展验证方法
/**
 * <input class="easyui-validatebox" data-options="
	required:true,
	validType:['email','length[0,20]']
">
 */

//检查角色编码是否重复 
//$.extend($.fn.validatebox.defaults.rules, {
//    checkRoleCode:{
//    	validator: function (value,params) {
//    		var checkR=$.ajax({
//                async : false,  
//                cache : false,
//                type : 'post',  
//                url : root + '/role/checkCode.do' ,
//                data : {  'code' : value } 
//            }).responseText;  
//    		
//    		return  checkR == "success"; 
//        },
//    	message: '角色编码重复'
//    }
//}); 

$.extend($.fn.validatebox.defaults.rules, {  
    //验证汉字  
    CHS: {  
        validator: function (value) {  
            return /^[\u0391-\uFFE5]+$/.test(value);  
        },  
        message: '只能输入汉字'  
    },  
    
    NUM: {  
        validator: function (value) {  
            var re =/^[0-9]*$/;
            return re.test(value);  
        },  
        message: '只能输入数字'  
    },  

    NUM1: {  
        validator: function (value) {  
            var re =/^[1-9]\d*(\.\d+)?$/;
            return re.test(value);  
        },  
        message: '输入数字不能小于0'  
    },  
    
    
    //移动手机号码验证  
    mobile: {//value值为文本框中的值  
        validator: function (value) {  
            var reg = /^1[3|4|5|8|9]\d{9}$/;  
            return reg.test(value);  
        },  
        message: '输入手机号码格式不准确.'  
    },  
    //国内邮编验证  
    zipcode: {  
        validator: function (value) {  
            var reg = /^[1-9]\d{5}$/;  
            return reg.test(value);  
        },  
        message: '邮编必须是非0开始的6位数字.'  
    },  
    //用户账号验证(只能包括 _ 数字 字母)   
    account: {//param的值为[]中值  
        validator: function (value, param) {  
            if (value.length < param[0] || value.length > param[1]) {  
                $.fn.validatebox.defaults.rules.account.message = '用户名长度必须在' + param[0] + '至' + param[1] + '范围';  
                return false;  
            } else {  
                if (!/^[\w]+$/.test(value)) {  
                    $.fn.validatebox.defaults.rules.account.message = '用户名只能数字、字母、下划线组成.';  
                    return false;  
                } else {  
                    return true;  
                }  
            }  
        }, message: ''  
    } ,
    /*必须和某个字段相等*/  
    equalTo: {  
        validator:function(value,param){  
            return $(param[0]).val() == value;  
        },  
        message:'字段不匹配'  
    }  
})







//$.extend($.fn.validatebox.defaults.rules, {
//    minLength: {
//		validator: function(value, param){
//			return value.length >= param[0];
//		},
//		message: 'Please enter at least {0} characters.'
//    }
//});
