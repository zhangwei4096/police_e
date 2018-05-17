<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\ScienceModel;

class Secience extends Controller{
    //科技人
    public function index(){
        
        $secience = (new ScienceModel)->getSecience();
        
        $this->assign([
            'title' => '科技人',
            'data'=>$secience,
            'page'=>$secience->render(),
            'page_total' => $secience->total()
        ]);
        return view();
    }
    
    public function more($id){
        //科技人详细页面
        $secience = ScienceModel::get($id);
        $secience->setInc('views',1,30);
        $this->assign([
            'title' => '科技人-'.$secience['title'],
            'data'=> $secience
        ]);
        return view();
    }
    
}