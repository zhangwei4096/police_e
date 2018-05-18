<?php
namespace app\json\controller;
use think\Controller;
use think\Request;
use app\json\model\NewsModel;

class News extends Controller{
    //新闻接口
    
    public function _initialize(){
        header("Content-Type:text/html; charset=utf-8");
    }
    
    public function index(){
        $request   = Request::instance();
        $key_words = $request->post('key_words'); //接收查询关键字
        $info = $request->param();
        if ($request->isPost()){
            if(@$key_words){
                //处理关键字查询请求
                $result  = (new NewsModel())->queryKey($key_words,$info);  
            }else{
                $info    = $request->post();
                $result  = (new NewsModel())->lists($info);
            }
            return json($result);
        }
    }
    
    public function add(){
        //新闻添加
        $request = Request::instance();
        if ($request->isPost()){
            $info    = $request->post();
            $result = (new NewsModel())->addNews($info);
            return json($result);
        }
        
    }
    
    public function update(){
        //新闻修改
        $request = Request::instance();
        $id          = $request->param('id');
        if ($request->isPost()){
            $info    = $request->post();
            $result = (new NewsModel())->editNews($id,$info);
            return json($result);
        }
        
    }
    
    public function delete(){
        //新闻删除
        $request = Request::instance();
        if ($request->isPost()){
            $id    = $request->post('id');
            $result = (new NewsModel())->deleteNews($id);
            return json($result);
        }
    }
    
}