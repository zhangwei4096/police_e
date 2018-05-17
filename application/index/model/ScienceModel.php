<?php
namespace app\index\model;
use think\Model;
class ScienceModel extends ProductModel{
        //科技人
        protected $table = 'police_science';
        protected $pk     = 'id';
        
      
        public   function getSecience(){
            //获取全部数据
            $science = self::order('add_time desc')->paginate(9);  //每页显示9条数据
            return $science;
        }
        
        
}