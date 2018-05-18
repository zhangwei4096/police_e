<?php
namespace app\json\controller;

use think\Controller;
use think\Request;
use app\json\model\ScienceModel;

class Science extends Controller{
    
    public function index(){
        //科技人信息展示
        $request = Request::instance();
        if ($request->isPost()){
            $info    = $request->param(); 
            $result = (new ScienceModel())->lists($info);
            return json($result);
        }
    }
    
    
    public function query(){
        //关键字查看科技人
        $request = Request::instance();
        if ($request->isPost()){
            $info            = $request->param(); 
            $key_words = $request->param('key_words');
            if (@$key_words){
                //有关键字提交过来
                $result = (new ScienceModel())->queryScience($key_words,$info);
                return json($result);
            }
            
        }
    }
    
    public function delete(){
        //删除科技人
        $reques = Request::instance();
        if ($reques->isPost()){
           
            $result = (new ScienceModel())->delScience($reques->post('id'));
            return json($result);
        }
    }
    
}