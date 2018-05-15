<?php
namespace app\admin\model;

use think\Model;

class LogModel extends Model{
    protected $table               = 'police_log';
    protected $pk                   = 'id';
    protected $createTime     = 'add_time';
    protected $updateTime    = false;

    static public function insertLog($log,$ip){
        //写入日志
        $logo = new LogModel();
        $logo->data = [
            'content' => $log,
            'ip'           => ip2long($ip)
        ];
        $logo->save();
        
    }
}