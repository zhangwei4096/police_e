<?php
namespace app\index\controller;
use think\Controller;
class Upload extends Controller{
    //公共上传方法
    public function img(){
        //图片上传
        // 获取表单上传文件 例如上传了001.jpg
        $file = request()->file('image');
        
        // 移动到框架应用根目录/public/uploads/ 目录下
         if($file){
            $info = $file->move(ROOT_PATH . 'public' . DS . 'uploads');
            if($info){
                // 成功上传后 获取上传信息
                $path = '/uploads/'.str_replace('\\','/',$info->getsaveName()); //返回图片的绝对路径
                $rs   = [
                    'result' => 1,
                    'msg'    => 'ok',
                    'path'   => $path
                ];
                
            }else{
                // 上传失败获取错误信息
                $rs = [
                    'result' => 2,
                    'msg'    => $file->getError()
                ];
                
            }
        }
        
        return json($rs); 
    }
    
    
    
    
    
    
    
    
    
    
    
}