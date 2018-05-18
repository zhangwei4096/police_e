<?php
namespace app\index\model;
use think\Model;
use think\Session;
use think\Validate;
use think\Db;
class ProductModel extends Model{
    protected $table = 'police_product';
    protected $pk     = 'id';
    protected $createTime  = 'add_time';
    protected $updateTime = false;
    
    
    
    public    function dateInsert($type,$data){
        //type ==1 是成果 有参数 2没有参数
        $data['userid'] = Session::get('userid');
        
        $rules = [
            'title'         => 'require|max:50',
            'content'   => 'require',
            'short_video' => 'require',
            'thumb'     => 'require'
        ];
        
        $validate = New Validate($rules);
        
        if (!$validate->check($data)){
            //返回错误信息
            return  $this->returnMessage('error', $validate->getError());
        }
       
        
        
        //执行入库操作
        if($type == 1){
            //成果的参数
            
//             array_filter($data['param_name']);
//             array_filter($data['param_value']);
            $param['name']  = array_values(array_filter($data['param_name']));
            $param['value']  =  array_values(array_filter($data['param_value']));
            $data['param']    = json_encode($param);
            unset($data['param_name']);
            unset($data['param_value']);
        }
        
        unset($data['type']);
        
        $product = self::create();
        if ($product->save($data)){
            return $this->returnMessage('ok', '恭喜您添加成功');
        }else {
            return $this->returnMessage('error', '');
        }
        
        
        
    }
    
    
    protected   function returnMessage($msg,$data){
        $result = [
            'msg' => $msg,
            'data' => $data
        ];
        return json($result);
    }
    
    public static function getKey($category,$limit){
        //获取指定分类数据
        $product = self::where('category',$category)->order('add_time desc')->paginate($limit);
        return $product;
    }
    
    public static function getAll($limit){
        //获取全部最新的数据
        $product = Db::name('product')->order('add_time desc')->limit($limit)->select();
        return $product;
    }
}