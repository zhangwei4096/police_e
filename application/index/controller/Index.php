<?php
namespace app\index\controller;

use think\Controller;
use think\Db;
use app\index\model\ProductModel;
use app\index\model\ScienceModel;

class Index extends Controller{
    
    public function index(){
       
        //新闻
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
        
        //成果展示
        $all_one = ProductModel::getAll('0,3');
        $all_two = ProductModel::getAll('3,3');
        $one      = ProductModel::getKey('刑事科学技术',3);  
        $two      = ProductModel::getKey('消防科学技术',3);  
        $three    = ProductModel::getKey('道路交通管理',3);  
        $four      = ProductModel::getKey('安全防范技术',3);  
        $five       = ProductModel::getKey('特种警用装备',3);  
        
        //科技人
        
        $science = (new ScienceModel)->getSecience();
        
        $this->assign([
            'title'      => '首页',   //标题
            'news'    => $item,  //传处理好的数据到页面
            'banner' => $news,  //页面滚动图
            'one'       => $one,  //刑事科学技术
            'two'       => $two,
            'three'    => $three,
            'four'      => $four,
            'five'       => $five,
            'all_one'  => $all_one,
            'all_two'  => $all_two,
            'science' => $science  //科技人
        ]);
        return view();
    }
    
    
}
