<?php
namespace app\json\controller;
use think\Controller;
use think\Request;
use app\json\model\ProductModel;

class Product extends Controller{
    //成果管理接口
    
    public function index(){
        //成果列表
        $request = Request::instance();
        if ($request->isPost()){
            $result  = (new ProductModel())->lists();
            return json($result);
        }
       
    }
    
    public function query(){
        //成果查询
        $request = Request::instance();
        if ($request->isPost()){
            $key_words = $request->post('key_words');
            if ($key_words){
                $result         = (new ProductModel())->getKey($key_words);
                return  json($result);
            }else{
                $result = [
                    'result' => 2,
                    'message'    => 'error',
                    'rows'   => ''
                ];
                return json($result);
            }
        }
    }
    
    public function get(){
        //查看成果详情
        $request = Request::instance();
        if ($request->isGet()){
            $id = $request->param('id');
            $rs = (new ProductModel())->moreInfo($id);
           
            return json($rs);
        }
    }
    
    public function export(){
        //成果导出
    }
    
}