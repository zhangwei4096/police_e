<?php
namespace app\index\controller;

use think\Controller;
use think\Session;
use think\Request;
use app\index\model\RegisterModel;

class Register extends Controller{
    //用户注册
    
    public function index(){
        
        return view();
    }
    
    
    public function action(){
        //用户注册验证提交并且注册
        $request = Request::instance();
        if ($request->isPost()){
            $result = RegisterModel::registerVrify($request->post());
            return $result;
        }
    }
    
    public function verify(){
        $verify = new Verify();
        $verify->doimg();
        Session::set('Rverify',$verify->getCode()); //把获取到的验证码保存到Session中去
    }
    
}