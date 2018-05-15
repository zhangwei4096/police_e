<?php
namespace app\index\model;
use think\Model;

class NewsModel extends Model{
    protected $table = 'police_news';
    protected $pk     = 'id';
    
    
   static public function getCategory($category){
        //新闻展示
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
        $news = NewsModel::where('category',$category)->order('add_time desc')->paginate(6);
        
        return $news;
    
    }
    
    
}