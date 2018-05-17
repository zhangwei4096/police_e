<?php
namespace app\index\model;
use think\Model;
use think\Validate;
use think\Session;

class RegisterModel extends Model{
    //用户注册模块
    protected $table = 'police_user';
    protected $pk     = 'userid';
    protected $createTime  = false;
    protected $updateTime = false;
    
    static public function registerVrify($info){
        $code      = Session::get('Rverify');
        
        if ($code != $info['code']){
            $result = [
                'msg' => 'error',
                'data' => '验证码不一致'
            ];
            return $result;
        }
        
            $rules      = [
                'username' => 'require|min:6|max:30',
                'password'  => 'require|confirm', //password_confirm
                'email'         => 'email',
                'mobile'       => 'number|max:11',
               
            ];
            
            $message = [
                'username.require'  => '用户名不能为空',
                'password.require'   => '密码不能为空',
                'email'                      => '邮箱地址有误',
                'mobile.max'            => '电话号码有误'
            ];
            
            //简单验证规则查看是否通过
            $validate = new Validate($rules,$message);
            if (!$validate->check($info)){
                $result = [
                    'msg' => 'error',
                    'data' => $validate->getError()
                ];
                return $result;
            }
            
            //在数据库查找用户名|电话号码|邮箱是否有重复
            
            if (RegisterModel::all(['username' => $info['username']])){
                $result = [
                    'msg' => 'error',
                    'data' => '已有相同的用户名了,请换个用户名试试！'
                ];
                return $result;
            }
            if (RegisterModel::all(['mobile' => $info['mobile']])){
                $result = [
                    'msg' => 'error',
                    'data' => '存在相同的电话号码'
                ];
                return $result;
            }
            if (RegisterModel::all(['email' => $info['email']])){
                $result = [
                    'msg' => 'error',
                    'data' => '存在相同的邮箱账号'
                ];
                return $result;
            }
            
            //以上验证都通过的时候用户才能被注册
            
            $user = new RegisterModel();
            unset($info['code']);
            unset($info['password_confirm']);
            if ($user->save($info)){
                $result = [
                    'msg' => 'ok',
                    'data' => '恭喜您已经成功注册,待管理审核通过后就可以正常使用了'
                ];
                return $result;
            }                
    }
    
}