<?php
namespace app\json\model;
use think\Model;
use think\Db;

class ScienceModel extends Model{
    protected $table               ='police_science';
    protected $pk                   = 'id';
    protected $createTime     = 'add_time';
    protected $updateTime    = false;
    
    
    public function lists($info){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   =>   Db::name('science')->order('add_time desc')->page($info['page'],$info['rows'])->select()
        ];
        
        return $result;
    }
    
    
    public function queryScience($key_words,$info){
        //查询科技人
        $result = [
            'result' => 1,
            'total'  => Db::name('science')->where('title','like',"%{$key_words}%")->count(),
            'message'    => 'ok',
            'rows'   => Db::name('science')->where('title','like',"%{$key_words}%")
            ->page($info['page'],$info['rows'])->select()
            ];
        return $result;
    }
    
   public function delScience($id){
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