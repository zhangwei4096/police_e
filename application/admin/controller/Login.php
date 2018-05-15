<?php
namespace app\admin\controller;

use think\Controller;
use think\Request;
use think\Validate;
use think\Db;
use think\Session;

class Login extends Controller{
    
    public function index(){
        return view('main/login');
    }
    
    public function action(){
        //管理员登录验证
        $request = Request::instance();
        if ($request->isPost()){
            
            //验证规则
            $rule = [
                'username' => 'require',
                'password'  => 'require'
            ];
            
            //验证提示信息
            $message = [
                'username.require' => '用户名不能为空',
                'password.require'  => '密码不能为空'
            ];
           
            $data = [
                'username' => $request->post('username'),
                'password'  => $request->post('password')
            ];
            
            //验证器
             $validate = new Validate($rule,$message);
             if (!$validate->check($data)){
                 $result = [
                     'msg' => 'error',
                     'data' =>  $validate->getError()
                 ];
                 
                 return json($result);
             }
            
             //验证数据库账号密码
             $where['username'] = $data['username'];
             $where['status'] = 1;
             $userinfo = Db::name('user')->where($where)->find();
             if ($userinfo && $userinfo['password'] == md5($data['password'])){
                 //验证通过开启全局SESSION
                 Session::set('status',$userinfo['status']);
                 Session::set('adminname',$data['username']);
                 Session::set('adminid',$userinfo['userid']);
                 return json([
                     'msg' => 'ok'
                 ]);
             }else{
                 $result = [
                     'msg' => 'error',
                     'data' => '账号或者密码错误'
                 ];
                 return json($result);
             }
             
        }
        
        
    }
    
}