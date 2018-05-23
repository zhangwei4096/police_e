<?php
namespace app\index\controller;
use think\Controller;
use app\index\model\ProductModel;
use think\Db;

class Product extends Controller{
    //成果
    public function index($category){
        //category = 0 代表全部信息
        switch ($category){
            case 0:
                //全部信息
                $title = '全部';
                break;
            case 1:
                $title = '刑事科学技术';
                break;
            case 2:
                $title = '消防科学技术';
                break;
            case 3:
                $title = '道路交通管理';
                break;
            case 4:
                $title = '安全防范技术';
                break;
            case 5:
                $title = '特种警用装备';
                break;
            case 6:
                $title = '警用信息通信';
                break;
            case 7:
                $title = '警务创意之窗';
                break;
        }
        
        //根据类型查询
        if ($category == 0){
            $data = Db::name('product')->order('add_time desc')->paginate(6);
        }else{
            $data = ProductModel::getKey($title, 6);
        }
                    
        $this->assign([
            'title' => '成果-'.$title,
            'info' => $title,
            'data'=> $data,
            'page'=> $data->render(),
            'page_total'=>$data->total()
        ]);
        return view();
    }
    
    public function more($id){
        //成果详细页面
        $product       = ProductModel::get($id);
        $product->setInc('views',1,30);
        $product['param'] = json_decode($product['param'],true);
        //判断参数是否设置
        
        if ($product['param']['name']){
            foreach ($product['param']['name'] as $k => $v){
               $a[$k]['name'] = $v;
               $a[$k]['value']  = $product['param']['value'][$k];
            }
              
            
            $table = '';
               for ($i=0;$i<(count($a));$i++){
                    $table.='<tr>';
                    if ($i%2==0 ){
                        $table.='<td>'.$a[$i]['name'].'：'.$a[$i]['value'].'</td>';   //偶数
                        if ($i+1 < count($a)){
                            $table.='<td>'.$a[$i+1]['name'].'：'.$a[$i+1]['value'].'</td>';  //奇数
                        }
                    }
                  
                        
                    
                    $table.='</tr>';
                }
                
        }else{
            $table = '';
        }  
        

        //根据userid 获取用户的username 获取发布人
        $username = @Db::name('user')->where('userid',$product['userid'])->column('username')[0];
        
        //热门推荐 根据点击量来排序
        $hots = ProductModel::all(function($query){
            $query->order('views desc')->limit(0,8);
        });
        
        $this->assign([
            'title'   => '成果-'.$product['title'],   //标题
            'product' => $product,
            'hots'      => $hots,  //热门推荐
            'username' => $username, //发布人
            'table' => $table
        ]);
        return view();
    }
    
}