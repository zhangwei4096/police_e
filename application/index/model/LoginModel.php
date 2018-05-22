<?php
namespace app\index\model;
use think\Session;
use think\Validate;
use think\Model;
use think\Db;

class LoginModel extends Model{
    protected $table = 'police_user';
    protected $pk     = 'userid';
    
    
    static public function loginVerify($info){
        $code = Session::get('Lverify');
        
        if ($code != $info['code']){
            return self::returnMassage('error', '验证码不正确,请重新输入');
        }
        
        //验证器
        $rules = [
            'username' => 'require',
            'password'  => 'require'
        ];
        
        $validate = new Validate($rules);
        if (!$validate->check($info)){
            return self::returnMassage('error', $validate->getError());
        }
        //以上验证都通过的时候
        $user = Db::name('user')->whereOr('email',$info['username'])->whereOr('mobile',$info['username'])->find();
        if ($user && $user['password'] == md5($info['password']) && $user['audit_flag'] == 1 && $user['delete_flag'] == 'false' &&$user['status']==0){
            //用户验证通过
           Session::set('username',$user['username']); //用户名
           Session::set('userid',$user['userid']);             //用户的唯一ID
           Session::set('email',$user['email']);             //用户的邮箱
           //Session::set('mobile',$user['mobile']);             //用户的手机号码
           return self::returnMassage('ok', 'success');
        }else{
            return self::returnMassage('error','账号密码错误或者账号没有通过审核');
        }
          
       
        
    }
    
    
  static  private function returnMassage($msg,$data){
        $result = [
            'msg' => $msg,
            'data' => $data
        ];
        return $result;
    }
    
}