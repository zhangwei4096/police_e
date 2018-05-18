<?php
namespace app\json\controller;

use think\Controller;
use app\json\model\UserModel;
use think\Request;



class User extends Controller{
    
    public function _initialize(){
        header("Content-type:text/html;Charset=Utf-8");
    }
    
    public function index(){
        //查询所有用户  并且可以根据用户名来模糊查询
        $request = Request::instance();
        $info       = $request->param();
        
       if (@$info['username']){
         
          $rs = (new UserModel())->queryUser($info['username'],$info);
          return json($rs);
          
       }else{
           $rs = (new UserModel())->lists($info);
           return json($rs);
       }
       
    }
    
    
    
    public function add(){
       //用户添加
        $request = Request::instance();
        if ($request->isPost()){
            $info = $request->param();
            
            $rs     = (new UserModel)->addUser($info);
            return json($rs);
        }
    }
    
    public function update(){
      //用户修改
      $request         = Request::instance();
      $info               = $request->post();
      $info['userid'] = $request->param('userid');
      if ($info['password'] == null){
          //����Ϊ��Ĭ�ϲ��޸�����
          unset($info['password']);
         
      } else {
          $info['password'] = md5($info['password']);
      }
      
      $rs = (new UserModel)->updateUser($info);
      return  json($rs);
    }
    
    public function delete(){
       //用户删除
        $request = Request::instance();
        if ($request->isPost()){
            $info = $request->param();
            $rs     = (new UserModel)->delUser($info['userid']);
            return json($rs);
        }
    }
    
    
    public function disable(){
        //用户禁用
        $request = Request::instance();
        if ($request->isPost()){
            $info = $request->param();
            $rs     = (new UserModel)->disableUser($info['userid']);
            return json($rs);
        }
     
    }
    
    public function active(){
        //启用用户
        $request = Request::instance();
        if ($request->isPost()){
            $info = $request->param();
            $rs     = (new UserModel)->activUser($info['userid']);
            return json($rs);
        }
    }
   
    
    public function query(){
        //查询用户
    }
    
    public function auth(){
        //审核用户列表
        $request = Request::instance();
        if ($request->isPost()){
            //返回没有审核通过的用户
            $result = (new UserModel)->authUser();
            return json($result);
        }
        
    }
    
    public function approve(){
        //审核通过
        $request = Request::instance();
        if($request->isPost()){
            $userid = $request->param('userid');
            $result  = (new UserModel)->approveUser($userid);
            return json($result);
        }
    }
    
    
    
}