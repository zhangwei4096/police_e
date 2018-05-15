<?php
namespace app\json\model;
use think\Model;
use think\Db;

class ProductModel extends Model{
    
    protected $table = 'police_product';
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
    
    public function getKey($key_words){
        
        $product = Db::table('police_product')->where('title','like',"%{$key_words}%")->select();
        $result = [
            'result' => 1,
            'total'  => Db::table('police_product')->where('title','like',"%{$key_words}%")->count(),
            'message'    => 'ok',
            'rows'   => $product
        ];
        return $result;
    }
    
    public function moreInfo($id){
        $info = $this->all(['id'=> $id]);
        return $info;
    }
    
}