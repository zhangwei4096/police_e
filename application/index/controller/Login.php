<?php
namespace app\index\controller;
use think\Controller;
use think\Session;
use think\Request;
use app\index\model\LoginModel;
use app\admin\model\LogModel;

class Login extends Controller{
    //用户登录
    
    public function index(){
        return view();
    }
    
    
    public function action(){
        //登录验证
        $request = Request::instance();
        if ($request->isPost()){
            $result = LoginModel::loginVerify($request->post());
            return $result;
        }
    }
    
    public function ok(){
        //验证通过写入日志中
        $request = Request::instance();
        LogModel::insertLog('用户'.Session::get('username').'在'.date('Y-m-d H:i:s').'登录系统',$request->ip());
        $this->success('欢迎您'.Session::get('username'),'Index/index');
    }
    
    
    public function out(){
        //退出登录并且写入日志中去
        $request = Request::instance();
        LogModel::insertLog('用户'.Session::get('username').'在'.date('Y-m-d H:i:s').'退出登录',$request->ip());
        
        Session::delete('username');
        Session::delete('userid');
        Session::delete('email');
        $this->success('退出登录成功','Index/index');
    }
    
    public function verify(){
        //用户登录验证码
        $verify = new Verify();
        $verify->doimg();
        Session::set('Lverify',$verify->getCode());
    }
    
}