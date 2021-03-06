<?php 
namespace app\admin\controller;
use think\Controller;
use think\Request;
use think\Session;
use app\admin\model\LogModel;
use app\json\model\UserModel;
use think\Db;
class Main extends Controller{
    
    public function _initialize(){
     header("Content-type:text/html;charset=utf-8");
        if(!session::get('status')){
            //记录非法登录用户的IP地址
            $request = Request::instance();
            LogModel::insertLog('有一个用非法访问后台地址',$request->ip());
            
            die($this->error('请勿非法访问！你的IP地址已记录！','Login/index'));
           
        }
            
    }
    
    public function index(){
        $this->success('欢迎您管理员','Main/main');
    }
    
    public function out(){
        //登出
        Session::delete('status');
        Session::delete('adminid');
        Session::delete('adminname');
        $this->success('期待您的下次登录','Login/index');
    }
    
    public function main(){
        return view();
    }
    
    public function view(){
        $request = Request::instance();
        if ($request->isGet()){
            $action = $request->param('action');
            return view('view/'.$action);
        }
    }
    
    public function editPwd(){
        //超级用户密码修改
        $data['userid']      = Session::get('adminid'); //获取用户ID
        $data['password'] = md5(Request::instance()->post('newPwd'));
        
        $user = Db::name('user')->update($data);
       
        if ($user){
             return json([
                 'msg' =>'ok',
                 'data' =>''
             ]);
         }
        
    }
    
    
}
