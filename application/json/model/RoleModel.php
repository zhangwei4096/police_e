<?php
namespace app\json\model;

use think\Model;
use app\json\controller\Role;

class RoleModel extends Model{
    
    protected $table = 'police_role';
    protected $pk     = 'id';
    protected $updateTime = false;
    protected $createTime   = false;
    

    
    public function lists(){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   => $this->all()
        ];
        
        return $result;
    }
    
    public function addRole($info){
        
        $role = new RoleModel();
        $role->data = [
            'role_id' => $info
        ];
        $rs     = $role->save();
        return $this->result($rs);
    }
    
    public function deleteRole($id){
        $rs = $this->destroy($id);
        return $this->result($rs);
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