<?php
namespace app\json\model;

use think\Model;
use think\Db;
class UserModel extends Model{
    
    protected $table = 'police_user';
    protected $pk    = 'userid';
    protected $updateTime = false;
    protected $createTime   = false;
    
    public function lists(){
        //审核通过了的用户
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   => UserModel::all(function($query){
                    $query->where('audit_flag', '1');
            })
        ];
        
        return $result;
    }
   
    public function queryUser($username){
        $result = [
            'result' => 1,
            'total'  => 1,
            'message'    => 'ok',
            //模糊查询
            'rows'   => Db::name('user')->where('username','like',"%{$username}%")->select()
           
        ];
        return $result;
    }
    
    
    public function addUser($info){
        $user = new UserModel();
        $user->data = [
                'username' => $info['username'],
                'password'  => md5($info['password']),
                'email'         => $info['email'],
                'mobile'       => $info['mobile'],
                'real_name' => $info['real_name'],
                'sex'             => $info['sex'],
                'addr'           => $info['addr'],
                'profession' => $info['profession'],
                'remark'       => $info['remark'],
                'status'         => $info['status'], //0��ͨ�û� 1����Ա
                'type'            => $info['type'],
                'audit_flag'    => 1,                               //��Ʊ�־ 0δ��� 1Ϊ���
                'delete_flag'  => $info['delete_flag'], //�Ƿ���ͣ
                'current_skin'=> $info['current_skin'], //Ƥ��
        ];
        return $this->result($user->save());
    }
    
    
    
    public function updateUser($info){
        //�û��޸�
        $user = $this->get($info['userid']);
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