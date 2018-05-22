<?php
namespace app\json\model;
use think\Model;
use think\Db;

class NewsModel extends Model{
    protected $table = 'police_news';
    protected $pk     = 'id';
    protected $updateTime = false;
    protected $createTime   = 'add_time';
    
    
    
    public function lists($info){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   => Db::name('news')->order('add_time desc')->page($info['page'],$info['rows'])->select()
        ];
        
        return $result;
    }
    
    public function queryKey($key,$info){
     
        $result = [
            'result' => 1,
            'total'  => Db::name('news')->where('title','like',"%{$key}%")->count(),
            'message'    => 'ok',
            'rows'   => Db::name('news')->where('title','like',"%{$key}%")->order('add_time desc')->
                page($info['page'],$info['rows'])->select()
            ];
        return $result;
    }
    
    public function addNews($info){
        $new = new NewsModel();
        $rs     = $new->save($info);
        return $this->result($rs);
    }
    
    public function editNews($id,$info){
        $new = $this->get($id);
        $rs     = $new->save($info);
        return $this->result($rs);
    }
    
    public function deleteNews($id){
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