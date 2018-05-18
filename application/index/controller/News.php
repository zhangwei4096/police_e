<?php
namespace app\index\controller;
use think\Controller;
use think\Request;
use app\index\model\NewsModel;

class News extends Controller{
   
     public function index($category){
        
         //查询出所有的新闻
         $news = NewsModel::getCategory($category);  
         $page  = $news->render();
         
         
         //分类
         switch ($category){
             case 0 :
                 $category = '科技资讯';
                 break;
             case 1 :
                 $category = '行业新闻';
                 break;
             case 2 :
                 $category = '热点资讯';
                 break;
         }
         
         $this->assign([
             'title'   => '新闻-'.$category,   //标题
             'data' => $news,  //在控制器中输出数据
             'page' => $page,  //分页
             'page_total' => $news->total()
         ]);
         return view();
     }
     
     public function more(){
         //新闻详细页面
         $request = Request::instance();
         if ($request->isGet()){
             $id            = $request->param('id');  //获取新闻ID
            
             $news       = NewsModel::get($id);
             $news->setInc('views',1,30);  
             $this->assign([
                 'title'   => '新闻-'.$news['title'],   //标题
                 'news' => $news
             ]);
             return view();
             
         }
         
     }
}