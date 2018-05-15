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
         
         $rs = '';
         foreach ($news as $key => $val){
             //判断是不是第三个标签  如果是则输出最大的优先级
             if($key == 2 || $key == 5){
                 $type = "class='mr0'";
             }
             $rs.='<li '.@$type.'>';
             $rs.='<a href='.url('News/more',['id'=>$val['id']]).'>';
             $rs.='<div class="achImg">';
             $rs.='<img src="'.$val['thumb'].'" width="380" height="210"/>';
             $rs.='</div>';
             $rs.='<div class="resText">';
             $rs.='<div class="clearfix newsTitle">';
             $rs.='<div class="nTime">'.date('d',strtotime($val['add_time'])).' ';
             $rs.='<h4 class="color-grey">'.date('Y/m',strtotime($val['add_time'])).'</h4>';
             $rs.='</div>';
             $rs.='<h3>'.$val['title'].'</h3>';
             $rs.='</div>';
             $rs.='<p class="ellipsis-3 nlP">'.$val['summary'].'';
             $rs.='</p>';
             $rs.='</div>';
             $rs.='</a>';
             $rs.='</li>';
         }
         
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
             'news' => $rs,  //在控制器中输出数据
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