<?php
namespace app\json\model;

use think\Model;
use think\Db;
class UserModel extends Model{
    
    protected $table = 'police_user';
    protected $pk    = 'userid';
    protected $updateTime = false;
    protected $createTime   = false;
    
    public function lists($info){
        //审核通过了的所有用户
        $result = [
            'result' => 1,
            'total'  =>  $this->count(),
            'message'    => 'ok',
            'rows'   => UserModel::all(function($query) use($info){
                    $query->where('audit_flag', '1')->page($info['page'],$info['rows']);
            })
        ];
        
        return $result;
    }
   
    public function queryUser($username,$info){
        $result = [
            'result' => 1,
            'total'  => Db::name('user')->where('username','like',"%{$username}%")->count(),
            'message'    => 'ok',
            //模糊查询
            'rows'   => UserModel::all(function($query) use($info){
                $query->where('username','like',"%{$info['username']}%")->page($info['page'],$info['rows']);
            })
           
        ];
        return $result;
    }
    
    
    public function addUser($info){
        //用户添加  需要检查 用户名&邮箱&电话号码是否有重复的
        $user = new UserModel();
        //检查密码是否设置 没有设置就默认为123456
        if ($info['password'] == null){
            $info['password'] = '123456';
        }
        
        $user->data = [
                'username' => $info['username'],
                'password'  => md5($info['password']),
                'email'         => $info['email'],
                'mobile'       => $info['mobile'],
                'real_name' => $info['real_name'],
                'sex'             => $info['sex'],
//                 'addr'           => $info['addr'],
//                 'profession' => $info['profession'],
//                 'remark'       => $info['remark'],
                'status'         => $info['status'], //默认为普通用户
 //               'type'            => $info['type'],
                'audit_flag'    => 1,                               //审核通过
 //               'delete_flag'  => $info['delete_flag'],  //
                'current_skin'=> $info['current_skin'], //Ƥ��
        ];
        
        //在数据库查找用户名|电话号码|邮箱是否有重复
        
        if (UserModel::all(['username' => $info['username']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '已有相同的用户名了,请换个用户名试试！'
            ];
            return $result;
        }
        if (UserModel::all(['mobile' => $info['mobile']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '存在相同的电话号码'
            ];
            return $result;
        }
        if (UserModel::all(['email' => $info['email']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '存在相同的邮箱账号'
            ];
            return $result;
        }
        
        
        
        return $this->result($user->save());
    }
    
    
    
    public function updateUser($info){
        //�û��޸�
        $user = $this->get($info['userid']);
        
        //在数据库查找用户名|电话号码|邮箱是否有重复
        
        if (UserModel::all(['username' => $info['username']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '已有相同的用户名了,请换个用户名试试！'
            ];
            return $result;
        }
        if (UserModel::all(['mobile' => $info['mobile']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '存在相同的电话号码'
            ];
            return $result;
        }
        if (UserModel::all(['email' => $info['email']])){
            $result = [
                'result' => 2,
                'message' => 'error',
                'data' => '存在相同的邮箱账号'
            ];
            return $result;
        }
        
        
        $rs     = $user->save($info);
        return $this->result($rs);
    }
    
    
    public function delUser($userid){
        //�û�ɾ������
        $rs = $this->destroy($userid);
         return $this->result($rs);
        
    }
    
    public  function activUser($userid){
        $user = $this->get($userid);
        $user->delete_flag = 'false';
        
         return $this->result($user->save());
       
    }
    
    public function disableUser($userid){
        $user = $this->get($userid);
        $user->delete_flag = 'true';
        
        return $this->result($user->save());
    }
    
    public function authUser(){
        //返回没有被审核通过的用户
        $result = [
            'result' => 1,
            'total'  => '',  //暂时留着
            'message'    => 'ok',
            'rows'   => $this->all(['audit_flag' => 0])   //audit_flag 1为审核通过 2为未审核
        ];
        return $result;
    }
    
    public function approveUser($userid){
        //修改用户为审核通过状态
        $user = $this->get($userid);
        $user->data = [
            'audit_flag' => 1
        ];
        return $this->result($user->save());
    }
    
    
    private function result($rs){
        if($rs){
            $result = [
                'result'      => 1,
                'message' => 'ok'
            ];
        }else{
            $result = [
                'result'      => 2,
                'message' => 'error'
            ];
        }
        
        return $result;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
}