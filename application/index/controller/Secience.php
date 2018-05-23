<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\ScienceModel;
use think\Request;
use app\index\model\CommentsModel;
use think\Db;
use think\Session;

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
        
        //获取当前文章的所有评论
        $comments = Db::query("
        SELECT c.id,c.comment_id,c.arc_id,c.arc_table,c.content,c.add_time,u.username,u.userid from police_comments as c JOIN police_user as u  ON c.user_id = u.userid 
            where c.arc_id=? and c.arc_table='science' order by c.add_time desc ",[$id]);
        
        //使用递归来处理评论
        $tree = $this->getTree($comments, 0);
        //根据userid 获取用户的username
        $username = @Db::name('user')->where('userid',$secience['userid'])->column('username')[0];
        //热门推荐 根据点击量来排序
        $hots  = ScienceModel::all(function($query){
                $query->order('views desc')->limit(0,4);
        });
        $this->assign([
            'title' => '科技人-'.$secience['title'],
            'data'=> $secience,
            'comments' => $tree,
            'username' => $username,
            'hots'      => $hots, //热门推荐
            'total'     => count($tree) //评论总数
        ]);
        return view();
    }
    
    public function sendComment(){
        //发表评论
        $request = Request::instance();
        if ($request->isPost()){
            $data = $request->post();  //接收来自页面传递过来的参数
            $data['arc_table'] = 'science'; //表名
            $data['user_id']    = Session::get('userid');
            $result = CommentsModel::create($data);
           if ($result){
               //返回执行成功
                return json([
                    'msg'   => 'ok',
                    'data'   => '发表评论成功'
                ]);
           }
    
        }
    
    }
    
    public function getTree($data, $id)
    {
        $tree = '';
        foreach($data as &$v)
        {
            if ($v['comment_id'] == $id){
                //父亲寻找儿子
                $v['_child']   = $this->getTree($data,$v['id']);
                $tree[]         = $v;
            }
            
        }
        return $tree;
    }
    
    
    
    
    
}