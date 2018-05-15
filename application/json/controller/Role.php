<?php
namespace app\json\controller;
use think\Controller;
use app\json\model\RoleModel;
use think\Request;

class Role extends Controller{
    //角色管理接口
    
    
    
    public function index(){
        $result = (new RoleModel())->lists();
        return json($result);
    }
    
    public function add(){
        //添加角色
        $request = Request::instance();
        if ($request->isPost()){
            $role_id = $request->post('role_id');
            $rs         = (new RoleModel())->addRole($role_id);
            return json($rs);
        }
    }
    
    
    public function delete(){
        //删除角色
        $request = Request::instance();
        if ($request->isPost()){
            $id = $request->post('id');
            $rs = (new RoleModel())->deleteRole($id);
            return json($rs);
        }
    }
    
}