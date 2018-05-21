<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\MemberModel;
use think\Session;
use think\Request;
use app\index\model\ProductModel;
use app\index\model\ScienceModel;

class Member extends Controller{
    
    public function index(){
        //会员中心首页
        $userid      = Session::get('userid');
        $user_info = MemberModel::get($userid);
        
        $product   = ProductModel::where('userid',$userid)->order('add_time desc')->paginate(5);
        $science    = ScienceModel::where('userid',$userid)->order('add_time desc')->paginate(5);
        
        $this->assign([
            'userinfo' => $user_info,
            'product' => $product,
            'science'  => $science,
            'title' => '个人中心',
        ]);
        return view();
    }
    
    public function setting(){
        //个人设置 需要抓取出当前用户的基本信息
        
        //获取用户ID
        $userid      = Session::get('userid');
        $user_info = MemberModel::get($userid);
        $this->assign([
            'userinfo' => $user_info,
            'title' => '个人设置',
        ]);
        return view();
    }
    
    
    public function save(){
        //获取页面需要修改的参数
        $request          = Request::instance();
         
        if ($request->isPost()){
            $data               = $request->post();
            $data['userid'] = Session::get('userid'); //用户的id
            $resutl             = (new MemberModel) ->userinfoUpdate($data);
            return json($resutl);
        }else if($request->isGet()){
            //获取GET请求
            $data               = $request->get();
            $data['userid'] = Session::get('userid'); //用户的id
            $data               = array_splice($data,1);  //删除第一个元素
            if (MemberModel::update($data)){
                $this->success('基本信息修改成功');
            }else {
                $this->error('基本信息修改失败');
            }
        }
    }
    
    public function myrelease($type){
        //我的发布
        $userid    = Session::get('userid');
        //$product = ProductModel::where('userid',$userid)->column('id,title,add_time,views,userid');
        //$science  = ScienceModel::where('userid',$userid)->column('id,title,add_time,views,userid');
       /*  foreach ($product as &$k ){
            //添加table元素
           $k['table'] = 'product';
        }
        foreach ($science as &$k){
            //添加table元素
            $k['table'] = 'science';
        }
        $array = array_merge($product,$science);
        //冒泡排序根据时间来排序
        for ($i=0;$i<count($array);$i++){
            for ($j=1;$j<count($array);$j++){
                if ( strtotime($array[$i]['add_time']) > strtotime($array[$j]['add_time']) ){
                   $tmp = $array[$j];
                   $array[$j] = $array[$i];
                   $array[$i] = $tmp;
               }
              
            }
          
        }
        
        unset($array[0]); */
        
        switch ($type){
            case 0:
                //成果
                $data = ProductModel::where('userid',$userid)->order('add_time desc')->paginate(16);
                break;
            case 1:
                //科技人
                $data = ScienceModel::where('userid',$userid)->order('add_time desc')->paginate(16);
                break;
        }
        
        $user_info = MemberModel::get($userid); //用户信息
        
        $this->assign([
            'userinfo' => $user_info,
            'data' => $data, //我的发布内容
            'page'=> $data->render(), //分页
            'page_total' => $data->total(),
        ]);
        return view();
    }
    
    public function getNumber(){
        $request = Request::instance();
        if ($request->isPost()){
            $userid    = $request->post('userid');
            $product = ProductModel::where('userid',$userid)->count();
            $science  = ScienceModel::where('userid',$userid)->count();
            $result = [
                'product' => $product, //成果数量
                'science'  => $science //科技人数量
            ];
            
            return json($result);
        }
    }
    
}