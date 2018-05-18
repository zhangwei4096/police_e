<?php
namespace app\json\model;
use think\Model;
use think\Db;

class ProductModel extends Model{
    
    protected $table = 'police_product';
    protected $pk     = 'id';
    protected $updateTime = false;
    protected $createTime   = false;
    
    public function lists($info){
        $result = [
            'result' => 1,
            'total'  => $this->count(),
            'message'    => 'ok',
            'rows'   =>  Db::name('product')->order('add_time desc')->page($info['page'],$info['rows'])->select()
        ];
        
        return $result;
    }
    
    public function getKey($key_words,$info){
        
        $result = [
            'result' => 1,
            'total'  => Db::name('product')->where('title','like',"%{$key_words}%")->page($info['page'],$info['rows'])->count(),
            'message'    => 'ok',
            'rows'   => Db::name('product')->where('title','like',"%{$key_words}%")->page($info['page'],$info['rows'])->select()
        ];
        return $result;
    }
    
    public function moreInfo($id){
        $info = $this->all(['id'=> $id]);
        return $info;
    }
    
    public function deleteProduct($id){
        //删除成果
        $product = $this->destroy($id);
        return $this->result($product);
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