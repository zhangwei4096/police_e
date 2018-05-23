<?php
namespace app\index\model;
use think\Model;

class CommentsModel extends Model{
    protected $table = 'police_comments';
    protected $pk     = 'id';
    protected $createTime    = 'add_time';
    protected $updateTime  = false;
    
    
}