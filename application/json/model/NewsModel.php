<?php
namespace app\json\model;
use think\Model;
use think\Db;

class NewsModel extends Model{
    protected $table = 'police_news';
    protected $pk     = 'id';
    protected $updateTime = false;
    protected $createTime   = 'add_time';
    
    
    
    public function lists(){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   => $this->all()
        ];
        
        return $result;
    }
    
    public function queryKey($key){
        $news = Db::table('police_news')->where('title','like',"%{$key}%")->select();
        $result = [
            'result' => 1,
            'total'  => Db::table('police_news')->where('title','like',"%{$key}%")->count(),
            'message'    => 'ok',
            'rows'   => $news
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