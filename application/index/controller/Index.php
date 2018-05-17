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
            'data'      => $news,
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
