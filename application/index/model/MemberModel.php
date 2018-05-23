<?php
namespace app\index\model;
use think\Model;

class MemberModel extends  Model{
    protected $table = 'police_user';
    protected $pk     = 'userid';
    protected $createTime  = false;
    protected $updateTime = false;
    
   public function userinfoUpdate($data){
       if (array_keys($data)[0] == 'username'){
          //当前传递过来修改username  首先检查下是否有同名的情况
           if (self::all(['username' => $data['username']])){
               $result = [
                   'msg' => 'error',
                   'data' => '已有相同的用户名了,请换个用户名试试！'
               ];
               return $result;
           }
           //执行修改操作
           if (self::update($data)){
               $result = [
                   'msg' => 'ok',
                   'data' => '用户名修改成功'
               ];
               return $result;
           }
           
       }else if (array_keys($data)[0] == 'password'){
           //执行密码修改操作
           $data['password'] = md5($data['password']);
           if (self::update($data)){
               $result = [
                   'msg' => 'ok',
                   'data' => '密码修改成功'
               ];
               return $result;
           }
       }else if (array_keys($data)[0] == 'real_name'){
           //修改真实姓名
           if (self::update($data)){
               $result = [
                   'msg' => 'ok',
                   'data' => '真实姓名修改成功'
               ];
               return $result;
           }
           
       }else if (array_keys($data)[0] == 'sex'){
           //执行性别修改操作
           if (self::update($data)){
               $result = [
                   'msg' => 'ok',
                   'data' => '您的性别修改成功'
               ];
               return $result;
           }
       }
       
   }
   
   
   
   
   
   
   
   
   
}