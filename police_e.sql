/*
Navicat MySQL Data Transfer

Source Server         : police_e
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : police_e

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-05-24 17:29:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for police_comments
-- ----------------------------
DROP TABLE IF EXISTS `police_comments`;
CREATE TABLE `police_comments` (
  `id` int(4) NOT NULL AUTO_INCREMENT COMMENT '评论ID',
  `arc_id` int(4) NOT NULL COMMENT '文章ID',
  `arc_table` varchar(50) DEFAULT NULL COMMENT '文章表',
  `user_id` int(4) NOT NULL,
  `comment_id` int(4) DEFAULT '0' COMMENT '回复ID 0为主回复',
  `content` varchar(255) NOT NULL COMMENT '回复内容',
  `add_time` datetime DEFAULT NULL COMMENT '回复时间',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=50 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_comments
-- ----------------------------
INSERT INTO `police_comments` VALUES ('1', '10', 'science', '8', '0', '11111', '2018-05-23 10:12:09');
INSERT INTO `police_comments` VALUES ('2', '10', 'science', '8', '0', '今天天气不错啊', '2018-05-23 10:15:03');
INSERT INTO `police_comments` VALUES ('18', '10', 'science', '8', '2', '是啊,天气很好啊', '2018-05-23 11:03:06');
INSERT INTO `police_comments` VALUES ('19', '10', 'science', '8', '1', '2223331123123', '2018-05-23 11:04:06');
INSERT INTO `police_comments` VALUES ('20', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:11');
INSERT INTO `police_comments` VALUES ('21', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:13');
INSERT INTO `police_comments` VALUES ('22', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:14');
INSERT INTO `police_comments` VALUES ('23', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:15');
INSERT INTO `police_comments` VALUES ('24', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:15');
INSERT INTO `police_comments` VALUES ('25', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:16');
INSERT INTO `police_comments` VALUES ('26', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:16');
INSERT INTO `police_comments` VALUES ('27', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:17');
INSERT INTO `police_comments` VALUES ('28', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:17');
INSERT INTO `police_comments` VALUES ('29', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:17');
INSERT INTO `police_comments` VALUES ('30', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:17');
INSERT INTO `police_comments` VALUES ('31', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:17');
INSERT INTO `police_comments` VALUES ('32', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:18');
INSERT INTO `police_comments` VALUES ('33', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:18');
INSERT INTO `police_comments` VALUES ('34', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:18');
INSERT INTO `police_comments` VALUES ('35', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:18');
INSERT INTO `police_comments` VALUES ('36', '3', 'science', '8', '0', '今天好热啊', '2018-05-23 13:30:31');
INSERT INTO `police_comments` VALUES ('37', '3', 'science', '8', '0', '哈哈哈', '2018-05-23 13:30:48');
INSERT INTO `police_comments` VALUES ('38', '10', 'science', '8', '0', '1111', '2018-05-23 13:31:34');
INSERT INTO `police_comments` VALUES ('39', '10', 'science', '8', '0', '2222', '2018-05-23 13:32:27');
INSERT INTO `police_comments` VALUES ('43', '10', 'science', '8', '0', '今天天气不错啊', '2018-05-23 13:51:42');
INSERT INTO `police_comments` VALUES ('44', '10', 'science', '8', '43', '是啊 天气很好啊', '2018-05-23 13:51:54');
INSERT INTO `police_comments` VALUES ('45', '10', 'science', '8', '2', '11111111', '2018-05-23 13:58:20');
INSERT INTO `police_comments` VALUES ('46', '10', 'science', '8', '2', '222222222222', '2018-05-23 13:58:40');
INSERT INTO `police_comments` VALUES ('47', '10', 'science', '8', '43', '是的是的', '2018-05-23 13:59:46');
INSERT INTO `police_comments` VALUES ('48', '2', 'science', '8', '0', '加油', '2018-05-23 15:29:46');
INSERT INTO `police_comments` VALUES ('49', '2', 'science', '8', '0', '哈哈哈', '2018-05-23 15:30:50');

-- ----------------------------
-- Table structure for police_log
-- ----------------------------
DROP TABLE IF EXISTS `police_log`;
CREATE TABLE `police_log` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `ip` int(10) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=73 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_log
-- ----------------------------
INSERT INTO `police_log` VALUES ('1', '有一个用户非法访问', '0', '2018-05-14 13:08:31');
INSERT INTO `police_log` VALUES ('2', '有一个用非法访问后台地址', '0', '2018-05-14 13:10:43');
INSERT INTO `police_log` VALUES ('3', '有一个用非法访问后台地址', '0', '2018-05-14 13:18:02');
INSERT INTO `police_log` VALUES ('4', '有一个用非法访问后台地址', '0', '2018-05-14 13:24:04');
INSERT INTO `police_log` VALUES ('5', '有一个用非法访问后台地址', '0', '2018-05-14 13:24:05');
INSERT INTO `police_log` VALUES ('6', '有一个用非法访问后台地址', '0', '2018-05-14 13:24:06');
INSERT INTO `police_log` VALUES ('7', '有一个用非法访问后台地址', '0', '2018-05-14 13:24:44');
INSERT INTO `police_log` VALUES ('8', '有一个用非法访问后台地址', '0', '2018-05-14 13:24:54');
INSERT INTO `police_log` VALUES ('9', '有一个用非法访问后台地址', '0', '2018-05-15 09:07:15');
INSERT INTO `police_log` VALUES ('10', '用户123456在2018-05-15 16:12:07退出登录', '0', '2018-05-15 16:12:07');
INSERT INTO `police_log` VALUES ('11', '用户123456在2018-05-15 16:16:12登录系统', '0', '2018-05-15 16:16:12');
INSERT INTO `police_log` VALUES ('12', '用户123456在2018-05-15 16:16:25退出登录', '0', '2018-05-15 16:16:25');
INSERT INTO `police_log` VALUES ('13', '用户123456在2018-05-15 16:20:12登录系统', '0', '2018-05-15 16:20:12');
INSERT INTO `police_log` VALUES ('14', '用户123456在2018-05-15 16:20:38退出登录', '0', '2018-05-15 16:20:38');
INSERT INTO `police_log` VALUES ('15', '用户123456在2018-05-15 16:52:52登录系统', '0', '2018-05-15 16:52:52');
INSERT INTO `police_log` VALUES ('16', '用户123456在2018-05-15 16:56:54退出登录', '0', '2018-05-15 16:56:54');
INSERT INTO `police_log` VALUES ('17', '用户123456在2018-05-15 17:02:07登录系统', '0', '2018-05-15 17:02:07');
INSERT INTO `police_log` VALUES ('18', '用户123456在2018-05-16 14:14:18退出登录', '0', '2018-05-16 14:14:18');
INSERT INTO `police_log` VALUES ('19', '用户123456在2018-05-16 14:16:00登录系统', '0', '2018-05-16 14:16:00');
INSERT INTO `police_log` VALUES ('20', '用户123456在2018-05-16 17:53:29退出登录', '0', '2018-05-16 17:53:29');
INSERT INTO `police_log` VALUES ('21', '用户123456在2018-05-17 09:22:32登录系统', '0', '2018-05-17 09:22:32');
INSERT INTO `police_log` VALUES ('22', '用户123456在2018-05-17 09:23:54登录系统', '0', '2018-05-17 09:23:54');
INSERT INTO `police_log` VALUES ('23', '用户123456在2018-05-17 09:24:48登录系统', '0', '2018-05-17 09:24:48');
INSERT INTO `police_log` VALUES ('24', '用户123456在2018-05-17 11:21:58退出登录', '0', '2018-05-17 11:21:58');
INSERT INTO `police_log` VALUES ('25', '有一个用非法访问后台地址', '0', '2018-05-17 14:20:40');
INSERT INTO `police_log` VALUES ('26', '有一个用非法访问后台地址', '0', '2018-05-17 14:20:51');
INSERT INTO `police_log` VALUES ('27', '有一个用非法访问后台地址', '0', '2018-05-17 14:21:09');
INSERT INTO `police_log` VALUES ('28', '有一个用非法访问后台地址', '0', '2018-05-17 14:22:05');
INSERT INTO `police_log` VALUES ('29', '有一个用非法访问后台地址', '0', '2018-05-17 14:22:50');
INSERT INTO `police_log` VALUES ('30', '有一个用非法访问后台地址', '0', '2018-05-17 14:22:51');
INSERT INTO `police_log` VALUES ('31', '有一个用非法访问后台地址', '0', '2018-05-17 14:22:52');
INSERT INTO `police_log` VALUES ('32', '有一个用非法访问后台地址', '0', '2018-05-17 14:22:53');
INSERT INTO `police_log` VALUES ('33', '有一个用非法访问后台地址', '0', '2018-05-17 14:23:01');
INSERT INTO `police_log` VALUES ('34', '有一个用非法访问后台地址', '0', '2018-05-17 14:23:32');
INSERT INTO `police_log` VALUES ('35', '有一个用非法访问后台地址', '0', '2018-05-17 14:24:09');
INSERT INTO `police_log` VALUES ('36', '有一个用非法访问后台地址', '0', '2018-05-17 15:02:50');
INSERT INTO `police_log` VALUES ('37', '有一个用非法访问后台地址', '0', '2018-05-17 15:02:50');
INSERT INTO `police_log` VALUES ('38', '有一个用非法访问后台地址', '0', '2018-05-17 15:26:53');
INSERT INTO `police_log` VALUES ('39', '有一个用非法访问后台地址', '0', '2018-05-17 15:27:02');
INSERT INTO `police_log` VALUES ('40', '用户123456在2018-05-17 16:43:24登录系统', '0', '2018-05-17 16:43:24');
INSERT INTO `police_log` VALUES ('41', '用户123456在2018-05-17 17:31:28登录系统', '0', '2018-05-17 17:31:28');
INSERT INTO `police_log` VALUES ('42', '用户123456在2018-05-18 09:29:07登录系统', '0', '2018-05-18 09:29:07');
INSERT INTO `police_log` VALUES ('43', '用户123456在2018-05-18 09:29:44退出登录', '0', '2018-05-18 09:29:44');
INSERT INTO `police_log` VALUES ('44', '有一个用非法访问后台地址', '0', '2018-05-18 09:29:51');
INSERT INTO `police_log` VALUES ('45', '有一个用非法访问后台地址', '0', '2018-05-18 10:17:18');
INSERT INTO `police_log` VALUES ('46', '有一个用非法访问后台地址', '0', '2018-05-18 11:00:17');
INSERT INTO `police_log` VALUES ('47', '用户123456在2018-05-18 11:00:44登录系统', '0', '2018-05-18 11:00:44');
INSERT INTO `police_log` VALUES ('48', '用户123456在2018-05-18 17:21:54登录系统', '0', '2018-05-18 17:21:54');
INSERT INTO `police_log` VALUES ('49', '用户123456在2018-05-21 09:29:54登录系统', '0', '2018-05-21 09:29:54');
INSERT INTO `police_log` VALUES ('50', '用户123456在2018-05-21 09:47:07登录系统', '0', '2018-05-21 09:47:07');
INSERT INTO `police_log` VALUES ('51', '用户123456在2018-05-21 10:06:16退出登录', '0', '2018-05-21 10:06:16');
INSERT INTO `police_log` VALUES ('52', '用户123456在2018-05-21 10:06:56登录系统', '0', '2018-05-21 10:06:56');
INSERT INTO `police_log` VALUES ('53', '用户123456在2018-05-21 10:48:17登录系统', '0', '2018-05-21 10:48:17');
INSERT INTO `police_log` VALUES ('54', '用户123456在2018-05-21 11:13:14退出登录', '0', '2018-05-21 11:13:14');
INSERT INTO `police_log` VALUES ('55', '用户张伟3在2018-05-21 11:13:31登录系统', '0', '2018-05-21 11:13:31');
INSERT INTO `police_log` VALUES ('56', '用户张伟3在2018-05-21 12:11:25登录系统', '0', '2018-05-21 12:11:25');
INSERT INTO `police_log` VALUES ('57', '用户张伟3在2018-05-21 13:24:51登录系统', '0', '2018-05-21 13:24:51');
INSERT INTO `police_log` VALUES ('58', '用户张伟在2018-05-21 14:27:57登录系统', '0', '2018-05-21 14:27:57');
INSERT INTO `police_log` VALUES ('59', '用户张伟在2018-05-21 15:25:02登录系统', '0', '2018-05-21 15:25:02');
INSERT INTO `police_log` VALUES ('60', '用户张伟在2018-05-22 13:27:32登录系统', '0', '2018-05-22 13:27:32');
INSERT INTO `police_log` VALUES ('61', '用户张伟在2018-05-22 13:32:31退出登录', '0', '2018-05-22 13:32:31');
INSERT INTO `police_log` VALUES ('62', '用户张伟在2018-05-23 09:20:00登录系统', '0', '2018-05-23 09:20:00');
INSERT INTO `police_log` VALUES ('63', '用户张伟在2018-05-23 09:29:34退出登录', '0', '2018-05-23 09:29:34');
INSERT INTO `police_log` VALUES ('64', '用户张伟在2018-05-23 09:30:09登录系统', '0', '2018-05-23 09:30:09');
INSERT INTO `police_log` VALUES ('65', '用户123456在2018-05-23 10:44:27登录系统', '0', '2018-05-23 10:44:27');
INSERT INTO `police_log` VALUES ('66', '用户123456在2018-05-23 13:28:36登录系统', '0', '2018-05-23 13:28:36');
INSERT INTO `police_log` VALUES ('67', '用户123456在2018-05-23 13:50:24登录系统', '0', '2018-05-23 13:50:24');
INSERT INTO `police_log` VALUES ('68', '用户123456在2018-05-23 13:50:26登录系统', '0', '2018-05-23 13:50:26');
INSERT INTO `police_log` VALUES ('69', '用户123456在2018-05-23 13:50:27登录系统', '0', '2018-05-23 13:50:27');
INSERT INTO `police_log` VALUES ('70', '用户123456在2018-05-23 15:29:32登录系统', '0', '2018-05-23 15:29:32');
INSERT INTO `police_log` VALUES ('71', '用户123456在2018-05-23 15:31:17退出登录', '0', '2018-05-23 15:31:17');
INSERT INTO `police_log` VALUES ('72', '用户123456在2018-05-24 09:40:27登录系统', '0', '2018-05-24 09:40:27');

-- ----------------------------
-- Table structure for police_news
-- ----------------------------
DROP TABLE IF EXISTS `police_news`;
CREATE TABLE `police_news` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL,
  `content` longtext,
  `summary` varchar(255) DEFAULT NULL COMMENT '新闻摘要',
  `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图',
  `short_video` varchar(255) DEFAULT NULL COMMENT '短视频',
  `add_time` datetime DEFAULT NULL COMMENT '发布时间',
  `views` int(3) NOT NULL DEFAULT '0' COMMENT '浏览次数',
  `allow_comment_flag` char(5) DEFAULT NULL COMMENT '是否允许评论',
  `category` varchar(255) NOT NULL COMMENT '分类',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_news
-- ----------------------------
INSERT INTO `police_news` VALUES ('11', '今天天气不错啊今天天气不错啊今天天气不错啊', '今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊', '天气好', '/uploads/20180514/5a8427e897ef0cb67062861f2e1db43c.png', '1', '2018-05-14 13:57:10', '4', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('12', '今天天气很好今天天气很好今天天气很好111123213213', '今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好v今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好&nbsp;&nbsp;今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好', '气很好', '/uploads/20180514/9ede081a0e9f8ef8267b79e505fb1c93.png', '12', '2018-05-14 14:53:15', '30', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('13', '住建部出手：楼市再迎调控密集期 这类城市或加码', '<p>\r\n	<br />\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	资料图：购房人在楼盘看沙盘并咨询售楼工作人员。中新社发 汤彦俊 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;中新网客户端北京5月14日电 (记者 邱宇)近两个月楼市出现升温迹象，成交量环比上升，新房价格环比涨幅有所扩大。面对楼市新变化，近半月，住建部约谈12个城市并再次强调楼市调控目标不变，各地楼市再次迎来调控密集期。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">多地楼市回暖 房价环比涨幅扩大</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;今年以来，一批城市相继放宽人才落户政策，不同程度地带来一些地方的楼市热度上升。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;根据国家统计局公布的数据，从环比看，新房价格上涨城市数量在1月、2月份均有所减少。到了3月份，上涨的城市有55个，比2月份多了6个城市，且房价环比增幅有所扩大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;其中，部分城市房价涨幅较为明显。数据显示，3月份，新房价格环比涨幅最高的海口为2.1%，其次是秦皇岛(1.4%)和长春(1%)。二手房方面，海口、太原、西安、哈尔滨等地环比涨幅均超过了1%。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;一线城市中，北京的房价一直备受关注。近两个月，北京二手房交易量出现回升，价格趋稳。我爱我家市场研究院发布的报告显示，4月，北京二手房网签量创下近一年的最高值。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;另据中国指数研究院发布的报告，4月全国楼市成交量环比上升，其中苏州升幅最为明显，大连、济南和温州次之。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">西安、海口等12城被住建部约谈</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;近半月，住建部就楼市调控问题约谈多个城市相关负责人。记者注意到，被约谈的部分城市楼市此前涨幅较为明显。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;据了解，“五一”前，住建部约谈了西安、海口、三亚、长春、哈尔滨、昆明、大连、贵阳、徐州、佛山等10个城市政府负责人。5月9日，又约谈了成都、太原两市政府负责人。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部相关负责人再次强调，坚持房地产调控目标不动摇、力度不放松。这是继全国两会“部长通道”后，住建部再一次表明坚决的态度。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部要求，应认真落实稳房价、稳租金的调控目标，落实地方调控主体责任，因城因地制宜，精准施策，确保房地产市场平稳健康发展。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	<img src=\"http://inews.gtimg.com/newsapp_match/0/3570991593/0\" class=\"content-picture\" /> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;资料图：海口国兴大道附近的在建商品房项目。中新社记者 骆云飞 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">近半月多地密集发布楼市调控新政</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;今年以来，全国各地出台的调控政策已经超过百次。而最近半个月，一些城市密集发布楼市新政，调控力度不断加大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;记者注意到，15个热点城市中，北京、合肥等地均发布了调控政策。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;北京市住建委5月7日发布的通知拟规定，限房价项目销售时如与周边同品质商品房差价较大，整体收购后转为共有产权住房。有分析称，这将压缩限价房的牟利空间。同时，工、农、中、建四大行上调了北京首套房贷款利率。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;4月底，合肥连发楼市调控政策，要求开发商必须申请预售许可取得预售许可证后，才能进行商品房预售。在租房方面，对租赁住房建设、运营等事项也进行了明确规定。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;15个热点城市之外的其他城市中，佛山、哈尔滨、东莞等地的调控力度也有所加大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;佛山规定，避免在夜间(17：30-次日8：30)进行项目开盘或销售活动，对预计购房人数较多的项目，尽可能采用摇号等方式进行销售；哈尔滨提出，对主城6区范围3年内新购的商品住房实施限售；东莞对原限价政策进一步升级，规定新建商品住房销售价格一经备案不得上调。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	<img src=\"http://inews.gtimg.com/newsapp_match/0/2304597619/0\" class=\"content-picture\" /> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;资料图：湖南长沙一楼盘土地上，推土机正在作业。 中新社记者 杨华峰 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">严打炒房行为 未来调控或加码</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;政府在严打房地产投机行为、遏制炒房方面的态度十分明确，市场调控也不断加码。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部负责人近日约谈成都、太原两市负责人时强调，大力整顿规范市场秩序，加强预期管理和舆论引导，遏制投机炒作，支持和满足群众刚性居住需求。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;多地正在严打房地产中介的炒作行为。5月，北京市住建委持续加大对违法违规中介的查处力度，严打违规炒作“学区房”，曝光10家违规中介；海南、成都、哈尔滨、重庆等地均提出严格房地产中介管理，对扰乱市场秩序的中介机构给予严厉处罚。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;在公积金管理方面，住建部、财政部、人民银行、公安部四部委5月11日联合发布《关于开展治理违规提取住房公积金工作的通知》，要求重点支持提取住房公积金在缴存地或户籍地购买首套普通住房和第二套改善型住房，防止提取住房公积金用于炒房投机。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;谈到未来的调控走向，上海易居房地产研究院智库中心总监严跃进说，如果未来部分城市楼市出现反弹迹象，调控政策则会相应加码，监管层对房地产去杠杆、抑投机的态度很坚决，并会体现在行动上。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;58安居客房产研究院首席分析师张波预计，2018年“因城施策、分类调控”的政策还将持续，房价上涨明显城市的调控力度会加强。2018年限购力度并不会减弱，限购加码的城市还有可能增加。(完)\r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	<br />\r\n</p>', '草原', '/uploads/20180514/472a6ebbe63dcd7311dac630cbeb2be4.png', '', '2018-05-14 14:53:43', '10', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('14', '习近平：促进香港同内地加强科技合作', '<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;新华社北京5月14日电 2017年6月，24名在港中国科学院院士、中国工程院院士给中共中央总书记、国家主席、中央军委主席习近平写信，表达了报效祖国的迫切愿望和发展创新科技的巨大热情。习近平对此高度重视，作出重要指示并迅速部署相关工作。他强调，促进香港同内地加强科技合作，支持香港成为国际创新科技中心，支持香港科技界为建设科技强国、为实现中华民族伟大复兴贡献力量。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;习近平指出，香港拥有较雄厚的科技基础，拥有众多爱国爱港的高素质科技人才，这是我国实施创新驱动发展战略、建设创新型国家的一支重要力量。长期以来，香港科技界为香港和国家发展作出了重要贡献。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;习近平强调，促进香港同内地加强科技合作，支持香港成为国际创新科技中心，发挥内地和香港各自的科技优势，为香港和内地经济发展、民生改善作出贡献，是在香港实行“一国两制”的题中应有之义。要重视香港院士来信反映的问题，抓紧研究制定具体政策，合理予以解决，以支持香港科技界为我们建设科技强国、为实现中华民族伟大复兴贡献力量。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;根据习近平总书记重要指示精神，科技部、财政部高度重视、多次召开专门会议，将香港科技创新力量作为国家创新体系和创新实力的重要组成部分，从国家整体科研布局和支撑香港自身发展两个层面，研究加强内地与香港科技合作的相关举措，并会同中央政府驻港联络办充分听取香港特区政府和科技界的意见建议，先行试点，特事特办，坚决迅速做好贯彻落实工作。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;目前，在港两院院士来信反映的国家科研项目经费过境香港使用、科研仪器设备入境关税优惠等问题已基本解决。国家重点研发计划已对香港16个国家重点实验室港澳伙伴实验室直接给予支持，并在试点基础上，对国家科技计划直接资助港澳科研活动作出总体制度安排。香港在内地设立的科研机构均已享受到支持科技创新的进口税收政策，澳门2个国家重点实验室港澳伙伴实验室也得到了国家科技计划直接支持，香港、澳门科技界反响热烈。下一步，国家有关部门还将系统落实习近平总书记重要指示精神，支持爱国爱港科研人员深入参与国家科技计划，有序扩大和深化内地与香港科技合作。\r\n</p>', '美丽', '/uploads/20180514/afdb80e4fe5059e68d5f15cd617a1155.png', '', '2018-05-14 14:54:17', '47', 'true', '科技资讯');

-- ----------------------------
-- Table structure for police_product
-- ----------------------------
DROP TABLE IF EXISTS `police_product`;
CREATE TABLE `police_product` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL COMMENT '标题',
  `content` longtext NOT NULL COMMENT '内容',
  `recommendation` varchar(255) NOT NULL COMMENT '推荐语',
  `param` varchar(255) DEFAULT NULL COMMENT '参数',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `thumb` varchar(255) NOT NULL COMMENT '缩略图',
  `views` int(4) DEFAULT '0' COMMENT '查看次数',
  `short_video` varchar(255) DEFAULT NULL COMMENT '短视频',
  `userid` int(3) NOT NULL COMMENT '发布人',
  `category` varchar(255) NOT NULL COMMENT '分类',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=25 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_product
-- ----------------------------
INSERT INTO `police_product` VALUES ('1', '无人机起飞了', '3333333333333333333333333333333333333333333333', '', null, '2018-05-11 15:18:04', '', null, null, '0', '特种警用装备');
INSERT INTO `police_product` VALUES ('2', '今天天气不错', '善政者，以法为纲，以人为本。我国宪法一大特色就是明确规定了国家的根本任务、发展道路、奋斗目标。这是我国宪法能够推动国家发展进步、保证人民创造幸福生活、保障中华民族实现伟大复兴的重要因素。 \r\n\r\n将习近平新时代中国特色社会主义思想载入宪法，以国家根本法的形式确认新时代我国发展的根本任务、领导核心、指导思想、发展道路、奋斗目标、战略步骤、基本方略，对于全党全国各族人民深入贯彻党的十九大精神，统一思想、凝聚力量，确保实现“两个一百年”奋斗目标、实现中华民族伟大复兴的中国梦，具有十分重大的意义。 \r\n\r\n党的十八大以来，以习近平同志为核心的党中央团结带领全党全国各族人民毫不动摇坚持和发展中国特色社会主义，统筹推进“五位一体”总体布局、协调推进“四个全面”战略布局，推进党的建设新的伟大工程，推动党和国家事业取得历史性成就、发生历史性变革，创立了习近平新时代中国特色社会主义思想，推动中国特色社会主义进入了新时代。\r\n\r\n习近平新时代中国特色社会主义思想，从理论和实践结合上系统回答了新时代坚持和发展中国特色社会主义的总目标、总任务、总体布局、战略布局和发展方向、发展方式、发展动力、战略步骤、外部条件、政治保证等基本问题，并根据新的实践对经济、政治、法治、科技、文化、教育、民生、民族、宗教、社会、生态文明、国家安全、国防和军队、“一国两制”和祖国统一、统一战线、外交、党的建设等方面作出理论分析和政策指导，体现了指导思想与行动纲领的有机统一。\r\n\r\n历史经验告诉我们，只有中国特色社会主义才能团结凝聚我国最广大人民群众；只有马克思主义中国化最新成果才能指引我国改革开放和社会主义现代化建设的正确方向。符合时代要求的宪法才能反映我国各族人民共同意志和根本利益，才是我们国家和人民经受住各种困难和风险考验、始终沿着中国特色社会主义道路前进的根本法治保障。\r\n\r\n \r\n\r\n \r\n\r\n(责编：董晓伟、黄策舆', '', null, '0000-00-00 00:00:00', '', '0', null, '0', '刑事科学技术');
INSERT INTO `police_product` VALUES ('3', '333', '33', '', null, null, '', '0', null, '0', '刑事科学技术');
INSERT INTO `police_product` VALUES ('8', '额eat ', '恩爱恩爱&nbsp;', '', '{\"name\":[\"1\",\"2\",\"3\"],\"value\":[\"4\",\"5\",\"6\"]}', '2018-05-16 11:25:54', '/uploads/20180516/dddab4bed1aa42f9f1a4d11539a01a12.jpg', '0', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('9', '这是我的创意哈哈', '这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈', '', '{\"name\":[\"1\"],\"value\":[\"1\"]}', '2018-05-16 13:34:00', '/uploads/20180516/66c584bfa153647bedd56a0f15e6a60c.jpg', '0', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('10', '这是我的创意哈哈', '这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈', '', '{\"name\":[\"1\"],\"value\":[\"1\"]}', '2018-05-16 13:44:19', '/uploads/20180516/66c584bfa153647bedd56a0f15e6a60c.jpg', '0', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('11', '一个重大的发现', '一个重大的发现一个重大的发现一个重大的发现一个重大的发现', '一个重大的发现一个重大的发现', '{\"name\":[\"1\",\"3\"],\"value\":[\"2\",\"4\"]}', '2018-05-16 14:43:54', '/uploads/20180516/48a722074a77c4144559a6b968fed7a5.jpg', '27', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('12', '测试测试', '测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试测试', '测试测试测试测试', '{\"name\":[\"\\u59d3\\u540d\",\"\\u5e74\\u9f84\"],\"value\":[\"\\u718a\\u5927\",\"\\u718a\\u5927\"]}', '2018-05-16 16:36:13', '/uploads/20180516/aa83b68d56edffa890aba69d0d002a54.jpg', '158', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('17', '生态环境保护多重要，听习近平怎么说', '<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;<strong>“绿水青山就是金山银山”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;我们既要绿水青山，也要金山银山。宁要绿水青山，不要金山银山，而且绿水青山就是金山银山。我们绝不能以牺牲生态环境为代价换取经济的一时发展。我们提出了建设生态文明、建设美丽中国的战略任务，给子孙留下天蓝、地绿、水净的美好家园。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年9月7日，习近平在哈萨克斯坦纳扎尔巴耶夫大学回答学生问题时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;绿水青山和金山银山决不是对立的，关键在人，关键在思路。保护生态环境就是保护生产力，改善生态环境就是发展生产力。让绿水青山充分发挥经济社会效益，不是要把它破坏了，而是要把它保护得更好。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2014年3月7日，习近平在参加贵州代表团审议时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;要加强生态文明建设，划定生态保护红线，为可持续发展留足空间，为子孙后代留下天蓝地绿水清的家园。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2016年3月7日，习近平在参加黑龙江代表团审议时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;绿水青山不仅是金山银山，也是人民群众健康的重要保障。对生态环境污染问题，各级党委和政府必须高度重视，要正视问题、着力解决问题，而不要去掩盖问题。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2016年8月19日，《在全国卫生与健康大会上的讲话》\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“像保护眼睛一样保护生态环境，像对待生命一样对待生态环境”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;环境就是民生，青山就是美丽，蓝天也是幸福。要着力推动生态环境保护，像保护眼睛一样保护生态环境，像对待生命一样对待生态环境。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2015年3月6日，习近平在参加江西代表团审议时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;生态环境没有替代品，用之不觉，失之难存。在生态环境保护建设上，一定要树立大局观、长远观、整体观，坚持保护优先，坚持节约资源和保护环境的基本国策，像保护眼睛一样保护生态环境，像对待生命一样对待生态环境，推动形成绿色发展方式和生活方式。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2016年3月10日，习近平在参加青海代表团审议时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“生态环境保护是功在当代、利在千秋的事业”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;生态环境保护是功在当代、利在千秋的事业。要清醒认识保护生态环境、治理环境污染的紧迫性和艰巨性，清醒认识加强生态文明建设的重要性和必要性，以对人民群众、对子孙后代高度负责的态度和责任，真正下决心把环境污染治理好、把生态环境建设好，努力走向社会主义生态文明新时代，为人民创造良好生产生活环境。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年5月24日，习近平在中共中央政治局第六次集体学习时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;建设生态文明是中华民族永续发展的千年大计。必须树立和践行绿水青山就是金山银山的理念，坚持节约资源和保护环境的基本国策，像对待生命一样对待生态环境，统筹山水林田湖草系统治理，实行最严格的生态环境保护制度，形成绿色发展方式和生活方式，坚定走生产发展、生活富裕、生态良好的文明发展道路，建设美丽中国，为人民创造良好生产生活环境，为全球生态安全作出贡献。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2017年10月18日，习近平在中共十九大报告中强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“把生态环境保护摆在更加突出的位置”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;建设生态文明是关系人民福祉、关系民族未来的大计。中国要实现工业化、城镇化、信息化、农业现代化，必须要走出一条新的发展道路。中国明确把生态环境保护摆在更加突出的位置。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年9月7日，习近平在哈萨克斯坦纳扎尔巴耶夫大学回答学生问题时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“人民生活的增长点”“经济社会持续健康发展的支撑点”“我国良好形象的发力点”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;坚决摒弃损害甚至破坏生态环境的发展模式，坚决摒弃以牺牲生态环境换取一时一地经济增长的做法，让良好生态环境成为人民生活的增长点、成为经济社会持续健康发展的支撑点、成为展现我国良好形象的发力点，让中华大地天更蓝、山更绿、水更清、环境更优美。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2017年5月26日，习近平在中共中央政治局第四十一次集体学习时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“山水林田湖是一个生命共同体”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;我们要认识到，山水林田湖是一个生命共同体，人的命脉在田，田的命脉在水，水的命脉在山，山的命脉在土，土的命脉在树。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年11月9日，习近平在党的十八届三中全会上作关于《中共中央关于全面深化改革若干重大问题的决定》的说明时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“最公平的公共产品”“最普惠的民生福祉”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;良好生态环境是最公平的公共产品，是最普惠的民生福祉。青山绿水、碧海蓝天是建设国际旅游岛的最大本钱，必须倍加珍爱、精心呵护。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年4月8日至10日，习近平在海南考察时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“买不来也借不到的宝贵财富”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;青山绿水、碧海蓝天是海南最强的优势和最大的本钱，是一笔既买不来也借不到的宝贵财富，破坏了就很难恢复。要把保护生态环境作为海南发展的根本立足点，牢固树立绿水青山就是金山银山的理念，像对待生命一样对待这一片海上绿洲和这一汪湛蓝海水，努力在建设社会主义生态文明方面作出更大成绩。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2018年4月11日至13日，习近平在海南考察时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“为子孙后代留下可持续发展的‘绿色银行’”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;希望海南处理好发展和保护的关系，着力在“增绿”、“护蓝”上下功夫，为全国生态文明建设当个表率，为子孙后代留下可持续发展的“绿色银行”。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年4月8日至10日，习近平在海南考察时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;生态环境问题，归根到底是资源过度开发、粗放利用、奢侈消费造成的。资源开发利用既要支撑当代人过上幸福生活，也要为子孙后代留下生存根基。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2017年5月26日，习近平在中共中央政治局第四十一次集体学习时强调\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;<strong>“不能越雷池一步”</strong>\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;要牢固树立生态红线的观念。在生态环境保护问题上，就是要不能越雷池一步，否则就应该受到惩罚。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;要建立责任追究制度，对那些不顾生态环境盲目决策、造成严重后果的人，必须追究其责任，而且应该终身追究。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2013年5月24日，习近平在中共中央政治局第六次集体学习时指出\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;对破坏生态环境的行为，不能手软，不能下不为例。\r\n</p>\r\n<p class=\"text\" style=\"font-family:&quot;font-size:16px;background-color:#FFFFFF;text-indent:2em;\">\r\n	&emsp;&emsp;——2015年3月6日，习近平在参加江西代表团审议时强调\r\n</p>', '【编前语】“环境就是民生，青山就是美丽，蓝天也是幸福。”拥有天蓝、地绿、水净的美好家园，是每个中国人', '{\"name\":[\"1\"],\"value\":[\"1\"]}', '2018-05-18 11:03:17', '/uploads/20180518/3a80edf5003d55b2863634dcbf0f4ec7.png', '12', '/uploads/20180518/b02b23f499495809c7e6d4bb94b9e570.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('14', '311353我去而亲仁群', '签发日期为人确认21签发日期为人确认21', '签发日期为人确认21', '{\"name\":[\"11\",\"22\",\"33\"],\"value\":[\"11\",\"22\",\"33\"]}', '2018-05-16 17:40:44', '/uploads/20180516/60ca5eaf552b23a4a52ebb2385c4a797.jpg', '37', null, '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('15', '312', '123123213', '32132131233', '{\"name\":[\"1\"],\"value\":[\"1\"]}', '2018-05-17 17:49:10', '/uploads/20180517/beaa4168a1210b602cf83089dd009c24.jpg', '0', '', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('16', '呵呵呵热', '呵呵呵热呵呵呵热呵呵呵热呵呵呵热', '呵呵呵热', '{\"name\":[\"\"],\"value\":[\"\"]}', '2018-05-17 17:56:02', '/uploads/20180517/91bfb7850540ed36d1060c5c070a6139.png', '12', '/uploads/20180517/c6a74664b286dece6e85040a01fe3b72.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('18', '我是成果', '我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果', '我是成果我是成果我是成果', '{\"name\":[\"\",\"\"],\"value\":[\"\",\"\"]}', '2018-05-18 17:22:46', '/uploads/20180518/ccd8fb819a973d5e7d539a08b9fce710.png', '0', '/uploads/20180518/ad14f7a7f8da5e9852d12fd1f92d7584.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('19', '我是成果', '我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果我是成果', '我是成果我是成果我是成果', '{\"name\":[\"\",\"\"],\"value\":[\"\",\"\"]}', '2018-05-18 17:22:47', '/uploads/20180518/ccd8fb819a973d5e7d539a08b9fce710.png', '0', '/uploads/20180518/ad14f7a7f8da5e9852d12fd1f92d7584.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('20', 'array_poparray_poparray_pop', 'array_poparray_poparray_poparray_pop', 'array_poparray_poparray_pop', '{\"name\":[\"\"],\"value\":[\"\"]}', '2018-05-18 17:24:45', '/uploads/20180518/818b7a63eb1b638acec577c09f810b35.png', '9', '/uploads/20180518/e5f78010e2409c7b2c54bc7e32682712.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('24', '今天天气不错今天天气不错今天天气不错今天天气不错', '今天天气不错今天天气不错今天天气不错今天天气不错', '今天天气不错今天天气不错今天天气不错', '{\"name\":[\"22\",\"33\"],\"value\":[\"22\",\"33\"]}', '2018-05-18 17:37:06', '/uploads/20180518/06161c26500776c3723bf80cb96283e6.png', '8', '/uploads/20180518/a8f92d19546350d64dfd7086b316b797.mp4', '8', '刑事科学技术');
INSERT INTO `police_product` VALUES ('23', '今天天气不错', '今天天气不错今天天气不错', '今天天气不错今天天气不错', '{\"name\":[\"11\"],\"value\":[\"11\"]}', '2018-05-18 17:35:44', '/uploads/20180518/8d9821acb2cf54e11fe52d6ac66cdf35.png', '11', '/uploads/20180518/ba66c390fc856612d49e6d331ccd36e4.mp4', '8', '刑事科学技术');

-- ----------------------------
-- Table structure for police_role
-- ----------------------------
DROP TABLE IF EXISTS `police_role`;
CREATE TABLE `police_role` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `role_id` char(4) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_role
-- ----------------------------
INSERT INTO `police_role` VALUES ('2', '002');
INSERT INTO `police_role` VALUES ('3', '003');

-- ----------------------------
-- Table structure for police_science
-- ----------------------------
DROP TABLE IF EXISTS `police_science`;
CREATE TABLE `police_science` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `content` longtext NOT NULL,
  `thumb` varchar(255) NOT NULL,
  `recommendation` varchar(255) DEFAULT NULL COMMENT '推荐语',
  `short_video` varchar(255) DEFAULT NULL COMMENT '短视频',
  `add_time` datetime DEFAULT NULL COMMENT '发布时间',
  `userid` int(3) DEFAULT NULL COMMENT '发布人',
  `views` int(4) NOT NULL DEFAULT '0' COMMENT '点击量',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_science
-- ----------------------------
INSERT INTO `police_science` VALUES ('1', '科技', '科技', '', '科技', null, '2018-05-14 10:05:14', '1', '0');
INSERT INTO `police_science` VALUES ('2', '这是我的创意哈哈', '这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈', '/uploads/20180516/66c584bfa153647bedd56a0f15e6a60c.jpg', null, null, '2018-05-16 13:40:24', '8', '6');
INSERT INTO `police_science` VALUES ('3', '这是我的创意哈哈', '这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈这是我的创意哈哈', '/uploads/20180516/66c584bfa153647bedd56a0f15e6a60c.jpg', null, null, '2018-05-16 14:01:55', '8', '15');
INSERT INTO `police_science` VALUES ('12', '2222', '222222222', '22222222222222', '222222222222222', '2222222222222222222', null, null, '0');
INSERT INTO `police_science` VALUES ('10', '朱晓明', '朱晓明朱晓明朱晓明朱晓明朱晓明', '/uploads/20180516/78bffac74ec8dcf845f801b042169e3e.jpg', '朱晓明朱晓明朱晓明', null, '2018-05-16 14:41:22', '8', '163');
INSERT INTO `police_science` VALUES ('13', '3333', '3333333333333333', '333333333333', '3333333333333', null, null, null, '0');
INSERT INTO `police_science` VALUES ('15', '第三个说过', '二手归属感', '个十多个十多个说过归属感说过', null, null, null, null, '0');

-- ----------------------------
-- Table structure for police_user
-- ----------------------------
DROP TABLE IF EXISTS `police_user`;
CREATE TABLE `police_user` (
  `userid` int(4) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) COLLATE utf8_esperanto_ci NOT NULL COMMENT '用户名',
  `password` varchar(100) COLLATE utf8_esperanto_ci NOT NULL COMMENT '密码',
  `email` varchar(100) COLLATE utf8_esperanto_ci NOT NULL COMMENT '邮箱',
  `mobile` char(11) COLLATE utf8_esperanto_ci NOT NULL COMMENT '电话号码',
  `real_name` varchar(50) COLLATE utf8_esperanto_ci NOT NULL COMMENT '真实姓名',
  `sex` enum('0','1') COLLATE utf8_esperanto_ci NOT NULL COMMENT '性别',
  `addr` varchar(255) COLLATE utf8_esperanto_ci NOT NULL COMMENT '地址',
  `profession` varchar(150) COLLATE utf8_esperanto_ci DEFAULT NULL COMMENT '专业',
  `remark` varchar(255) COLLATE utf8_esperanto_ci DEFAULT NULL COMMENT '个人简介',
  `status` int(1) DEFAULT NULL COMMENT '状态',
  `type` int(1) NOT NULL DEFAULT '0' COMMENT '类型',
  `audit_flag` int(1) NOT NULL DEFAULT '0' COMMENT '审计标志 0为未审核 1为审核通过',
  `delete_flag` char(5) COLLATE utf8_esperanto_ci NOT NULL DEFAULT 'false' COMMENT '删除标志',
  `current_skin` char(15) COLLATE utf8_esperanto_ci NOT NULL DEFAULT 'default' COMMENT '当前皮肤',
  PRIMARY KEY (`userid`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `mobile` (`mobile`)
) ENGINE=MyISAM AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_esperanto_ci COMMENT='用户基本信息表';

-- ----------------------------
-- Records of police_user
-- ----------------------------
INSERT INTO `police_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin@qq.com', '18180053005', '超级管理员', '0', '', '计算机', '管理员', '1', '0', '1', 'false', 'default');
INSERT INTO `police_user` VALUES ('8', '123456', 'f379eaf3c831b04de153469d1bec345e', '11@qq.com', '18180053004', '张伟', '0', '成都', 'IT工程师', '今天天气不错啊1', '0', '0', '1', 'false', 'default');
INSERT INTO `police_user` VALUES ('22', '82939406', 'e10adc3949ba59abbe56e057f20f883e', '836338276@qq.com', '18180053007', '张伟', '0', '', null, null, '0', '0', '1', 'false', 'default');
