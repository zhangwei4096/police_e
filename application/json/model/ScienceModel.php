<?php
namespace app\json\model;
use think\Model;
use think\Db;

class ScienceModel extends Model{
    protected $table               ='police_science';
    protected $pk                   = 'id';
    protected $createTime     = 'add_time';
    protected $updateTime    = false;
    
    
    public function lists(){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   =>   Db::name('science')->order('add_time desc')->select()
        ];
        
        return $result;
    }
    
    
    public function queryScience($key_words){
        //查询科技人
        $science = Db::table('police_science')->where('title','like',"%{$key_words}%")
        ->select();
        $result = [
            'result' => 1,
            'total'  => Db::table('police_science')->where('title','like',"%{$key_words}%")
            ->count(),
            'message'    => 'ok',
            'rows'   => $science
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