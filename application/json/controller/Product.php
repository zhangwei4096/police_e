<?php
namespace app\json\controller;
use think\Controller;
use think\Request;
use app\json\model\ProductModel;

class Product extends Controller{
    //�ɹ�����ӿ�
    
    public function index(){
        //成果全部的数据
        $request = Request::instance();
        if ($request->isPost()){
            $info     = $request->param();
            $result  = (new ProductModel())->lists($info);
            return json($result);
        }
       
    }
    
    public function query(){
        //�ɹ���ѯ
        $request = Request::instance();
        if ($request->isPost()){
            $key_words = $request->post('key_words');
            $info     = $request->param();
            if ($key_words){
                $result         = (new ProductModel())->getKey($key_words,$info);
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
        //�鿴�ɹ�����
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
    
    public function delete(){
        //成果删除操作
        $request = Request::instance();
        if ($request->isPost()){
            $id = $request->post('id');
            $result = (new ProductModel)->deleteProduct($id);
            return json($result);
        }
    }



}