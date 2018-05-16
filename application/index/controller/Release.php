<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\index\model\ProductModel;
use app\index\model\ScienceModel;

class Release extends Controller{
    //发布
    
    public function index($type){
        //默认为成果发布页面
        switch ($type){
            case 1:
                $title = '发布成果';
                break;
            case 2:
                $title = '发布科技人';
                break;
            case 3:
                $title = '发布问题';
                break;
        }
        
        $this->assign([
            'title' => $title
        ]);
        return view();
    }
    
    
    public function dataAction(){
        //添加成果数据
        $request = Request::instance();
        
        
        if($request->isPost()){
            switch ($request->post('type')){
                case 1:
                    //发布成果
                    $result = (new ProductModel)->dateInsert(1,$request->post());
                    break;
                case 2:
                    //发布科技人
                    $result = (new ScienceModel)->dateInsert(2,$request->post());
                    break;
                case 3:
                    //发布问题
                    
                    break;
            }
            
            return $result;
        }
        
        
        
    }
    
}