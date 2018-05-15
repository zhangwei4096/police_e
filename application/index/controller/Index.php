<?php
namespace app\index\controller;

use think\Controller;
use think\Db;

class Index extends Controller{
    
    public function index(){
        
        $news =  Db::name('news')->where('category','科技资讯')->order('add_time','desc')->limit(0,3)->column('id,title,thumb,add_time');
        $item  = '';
        foreach ($news as $key => $val){
         $item.='<li>';
         $item.='<a href="/index/News/more/id/'.$val['id'].'">';
         $item.='<div class="moreRead">';
         $item.='<div class="moreR">';
         $item.='Read More';
         $item.='</div>';
         $item.='</div>';
         $item.='<div class="newsTime">';
         $item.='<h5><span class="ntData">'.date('m',strtotime($val['add_time'])).'</span> / <span class="ntData">'.date('d',strtotime($val['add_time'])).'</span></h5>';
         $item.='</div>';
         $item.='<div class="ellipsis nslText">'.$val['title'].'</div>';
         $item.='</a>';
         $item.='</li>';
        }
        
        
        $this->assign([
            'title'      => '首页',   //标题
            'news'    => $item,  //传处理好的数据到页面
            'banner' => $news  //页面滚动图
        ]);
        return view();
    }
    
    
}
