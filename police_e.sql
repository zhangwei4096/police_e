/*
Navicat MySQL Data Transfer

Source Server         : police_e
Source Server Version : 50553
Source Host           : localhost:3306
Source Database       : police_e

Target Server Type    : MYSQL
Target Server Version : 50553
File Encoding         : 65001

Date: 2018-05-15 17:52:44
*/

SET FOREIGN_KEY_CHECKS=0;

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
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

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
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_news
-- ----------------------------
INSERT INTO `police_news` VALUES ('11', '今天天气不错啊今天天气不错啊今天天气不错啊', '今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊今天天气不错啊', '天气好', '/uploads/20180514/5a8427e897ef0cb67062861f2e1db43c.png', '1', '2018-05-14 13:57:10', '2', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('12', '今天天气很好今天天气很好今天天气很好111123213213', '今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好v今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好&nbsp;&nbsp;今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好今天天气很好', '气很好', '/uploads/20180514/9ede081a0e9f8ef8267b79e505fb1c93.png', '12', '2018-05-14 14:53:15', '27', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('13', '住建部出手：楼市再迎调控密集期 这类城市或加码', '<p>\r\n	<br />\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	资料图：购房人在楼盘看沙盘并咨询售楼工作人员。中新社发 汤彦俊 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;中新网客户端北京5月14日电 (记者 邱宇)近两个月楼市出现升温迹象，成交量环比上升，新房价格环比涨幅有所扩大。面对楼市新变化，近半月，住建部约谈12个城市并再次强调楼市调控目标不变，各地楼市再次迎来调控密集期。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">多地楼市回暖 房价环比涨幅扩大</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;今年以来，一批城市相继放宽人才落户政策，不同程度地带来一些地方的楼市热度上升。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;根据国家统计局公布的数据，从环比看，新房价格上涨城市数量在1月、2月份均有所减少。到了3月份，上涨的城市有55个，比2月份多了6个城市，且房价环比增幅有所扩大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;其中，部分城市房价涨幅较为明显。数据显示，3月份，新房价格环比涨幅最高的海口为2.1%，其次是秦皇岛(1.4%)和长春(1%)。二手房方面，海口、太原、西安、哈尔滨等地环比涨幅均超过了1%。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;一线城市中，北京的房价一直备受关注。近两个月，北京二手房交易量出现回升，价格趋稳。我爱我家市场研究院发布的报告显示，4月，北京二手房网签量创下近一年的最高值。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;另据中国指数研究院发布的报告，4月全国楼市成交量环比上升，其中苏州升幅最为明显，大连、济南和温州次之。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">西安、海口等12城被住建部约谈</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;近半月，住建部就楼市调控问题约谈多个城市相关负责人。记者注意到，被约谈的部分城市楼市此前涨幅较为明显。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;据了解，“五一”前，住建部约谈了西安、海口、三亚、长春、哈尔滨、昆明、大连、贵阳、徐州、佛山等10个城市政府负责人。5月9日，又约谈了成都、太原两市政府负责人。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部相关负责人再次强调，坚持房地产调控目标不动摇、力度不放松。这是继全国两会“部长通道”后，住建部再一次表明坚决的态度。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部要求，应认真落实稳房价、稳租金的调控目标，落实地方调控主体责任，因城因地制宜，精准施策，确保房地产市场平稳健康发展。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	<img src=\"http://inews.gtimg.com/newsapp_match/0/3570991593/0\" class=\"content-picture\" /> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;资料图：海口国兴大道附近的在建商品房项目。中新社记者 骆云飞 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">近半月多地密集发布楼市调控新政</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;今年以来，全国各地出台的调控政策已经超过百次。而最近半个月，一些城市密集发布楼市新政，调控力度不断加大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;记者注意到，15个热点城市中，北京、合肥等地均发布了调控政策。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;北京市住建委5月7日发布的通知拟规定，限房价项目销售时如与周边同品质商品房差价较大，整体收购后转为共有产权住房。有分析称，这将压缩限价房的牟利空间。同时，工、农、中、建四大行上调了北京首套房贷款利率。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;4月底，合肥连发楼市调控政策，要求开发商必须申请预售许可取得预售许可证后，才能进行商品房预售。在租房方面，对租赁住房建设、运营等事项也进行了明确规定。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;15个热点城市之外的其他城市中，佛山、哈尔滨、东莞等地的调控力度也有所加大。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;佛山规定，避免在夜间(17：30-次日8：30)进行项目开盘或销售活动，对预计购房人数较多的项目，尽可能采用摇号等方式进行销售；哈尔滨提出，对主城6区范围3年内新购的商品住房实施限售；东莞对原限价政策进一步升级，规定新建商品住房销售价格一经备案不得上调。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	<img src=\"http://inews.gtimg.com/newsapp_match/0/2304597619/0\" class=\"content-picture\" /> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;资料图：湖南长沙一楼盘土地上，推土机正在作业。 中新社记者 杨华峰 摄\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;<span style=\"font-weight:bolder;\">严打炒房行为 未来调控或加码</span> \r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;政府在严打房地产投机行为、遏制炒房方面的态度十分明确，市场调控也不断加码。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;住建部负责人近日约谈成都、太原两市负责人时强调，大力整顿规范市场秩序，加强预期管理和舆论引导，遏制投机炒作，支持和满足群众刚性居住需求。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;多地正在严打房地产中介的炒作行为。5月，北京市住建委持续加大对违法违规中介的查处力度，严打违规炒作“学区房”，曝光10家违规中介；海南、成都、哈尔滨、重庆等地均提出严格房地产中介管理，对扰乱市场秩序的中介机构给予严厉处罚。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;在公积金管理方面，住建部、财政部、人民银行、公安部四部委5月11日联合发布《关于开展治理违规提取住房公积金工作的通知》，要求重点支持提取住房公积金在缴存地或户籍地购买首套普通住房和第二套改善型住房，防止提取住房公积金用于炒房投机。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;谈到未来的调控走向，上海易居房地产研究院智库中心总监严跃进说，如果未来部分城市楼市出现反弹迹象，调控政策则会相应加码，监管层对房地产去杠杆、抑投机的态度很坚决，并会体现在行动上。\r\n</p>\r\n<p class=\"one-p\" style=\"font-family:&quot;font-size:18px;\">\r\n	&emsp;&emsp;58安居客房产研究院首席分析师张波预计，2018年“因城施策、分类调控”的政策还将持续，房价上涨明显城市的调控力度会加强。2018年限购力度并不会减弱，限购加码的城市还有可能增加。(完)\r\n</p>\r\n<p>\r\n	<br />\r\n</p>\r\n<p>\r\n	<br />\r\n</p>', '草原', '/uploads/20180514/472a6ebbe63dcd7311dac630cbeb2be4.png', '', '2018-05-14 14:53:43', '6', 'true', '科技资讯');
INSERT INTO `police_news` VALUES ('14', '习近平：促进香港同内地加强科技合作', '<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;新华社北京5月14日电 2017年6月，24名在港中国科学院院士、中国工程院院士给中共中央总书记、国家主席、中央军委主席习近平写信，表达了报效祖国的迫切愿望和发展创新科技的巨大热情。习近平对此高度重视，作出重要指示并迅速部署相关工作。他强调，促进香港同内地加强科技合作，支持香港成为国际创新科技中心，支持香港科技界为建设科技强国、为实现中华民族伟大复兴贡献力量。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;习近平指出，香港拥有较雄厚的科技基础，拥有众多爱国爱港的高素质科技人才，这是我国实施创新驱动发展战略、建设创新型国家的一支重要力量。长期以来，香港科技界为香港和国家发展作出了重要贡献。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;习近平强调，促进香港同内地加强科技合作，支持香港成为国际创新科技中心，发挥内地和香港各自的科技优势，为香港和内地经济发展、民生改善作出贡献，是在香港实行“一国两制”的题中应有之义。要重视香港院士来信反映的问题，抓紧研究制定具体政策，合理予以解决，以支持香港科技界为我们建设科技强国、为实现中华民族伟大复兴贡献力量。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;根据习近平总书记重要指示精神，科技部、财政部高度重视、多次召开专门会议，将香港科技创新力量作为国家创新体系和创新实力的重要组成部分，从国家整体科研布局和支撑香港自身发展两个层面，研究加强内地与香港科技合作的相关举措，并会同中央政府驻港联络办充分听取香港特区政府和科技界的意见建议，先行试点，特事特办，坚决迅速做好贯彻落实工作。\r\n</p>\r\n<p style=\"color:#404040;font-family:&quot;font-size:18px;background-color:#FFFFFF;\">\r\n	&emsp;&emsp;目前，在港两院院士来信反映的国家科研项目经费过境香港使用、科研仪器设备入境关税优惠等问题已基本解决。国家重点研发计划已对香港16个国家重点实验室港澳伙伴实验室直接给予支持，并在试点基础上，对国家科技计划直接资助港澳科研活动作出总体制度安排。香港在内地设立的科研机构均已享受到支持科技创新的进口税收政策，澳门2个国家重点实验室港澳伙伴实验室也得到了国家科技计划直接支持，香港、澳门科技界反响热烈。下一步，国家有关部门还将系统落实习近平总书记重要指示精神，支持爱国爱港科研人员深入参与国家科技计划，有序扩大和深化内地与香港科技合作。\r\n</p>', '美丽', '/uploads/20180514/afdb80e4fe5059e68d5f15cd617a1155.png', '', '2018-05-14 14:54:17', '38', 'true', '热点资讯');

-- ----------------------------
-- Table structure for police_product
-- ----------------------------
DROP TABLE IF EXISTS `police_product`;
CREATE TABLE `police_product` (
  `id` int(4) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) DEFAULT NULL COMMENT '标题',
  `content` longtext COMMENT '内容',
  `param` varchar(255) DEFAULT NULL COMMENT '参数',
  `add_time` datetime DEFAULT NULL COMMENT '添加时间',
  `up_time` datetime DEFAULT NULL COMMENT '修改时间',
  `thumb` varchar(255) DEFAULT NULL COMMENT '缩略图',
  `views` int(4) DEFAULT '0' COMMENT '查看次数',
  `likes` int(4) DEFAULT '0' COMMENT '点赞数',
  `short_video` varchar(255) DEFAULT NULL COMMENT '短视频',
  `userid` int(3) NOT NULL COMMENT '发布人',
  `category` varchar(255) NOT NULL COMMENT '分类',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_product
-- ----------------------------
INSERT INTO `police_product` VALUES ('1', '无人机起飞了', '3333333333333333333333333333333333333333333333', null, '2018-05-11 15:18:04', '2018-05-11 15:17:55', null, null, null, null, '0', '');
INSERT INTO `police_product` VALUES ('2', '今天天气不错', '善政者，以法为纲，以人为本。我国宪法一大特色就是明确规定了国家的根本任务、发展道路、奋斗目标。这是我国宪法能够推动国家发展进步、保证人民创造幸福生活、保障中华民族实现伟大复兴的重要因素。 \r\n\r\n将习近平新时代中国特色社会主义思想载入宪法，以国家根本法的形式确认新时代我国发展的根本任务、领导核心、指导思想、发展道路、奋斗目标、战略步骤、基本方略，对于全党全国各族人民深入贯彻党的十九大精神，统一思想、凝聚力量，确保实现“两个一百年”奋斗目标、实现中华民族伟大复兴的中国梦，具有十分重大的意义。 \r\n\r\n党的十八大以来，以习近平同志为核心的党中央团结带领全党全国各族人民毫不动摇坚持和发展中国特色社会主义，统筹推进“五位一体”总体布局、协调推进“四个全面”战略布局，推进党的建设新的伟大工程，推动党和国家事业取得历史性成就、发生历史性变革，创立了习近平新时代中国特色社会主义思想，推动中国特色社会主义进入了新时代。\r\n\r\n习近平新时代中国特色社会主义思想，从理论和实践结合上系统回答了新时代坚持和发展中国特色社会主义的总目标、总任务、总体布局、战略布局和发展方向、发展方式、发展动力、战略步骤、外部条件、政治保证等基本问题，并根据新的实践对经济、政治、法治、科技、文化、教育、民生、民族、宗教、社会、生态文明、国家安全、国防和军队、“一国两制”和祖国统一、统一战线、外交、党的建设等方面作出理论分析和政策指导，体现了指导思想与行动纲领的有机统一。\r\n\r\n历史经验告诉我们，只有中国特色社会主义才能团结凝聚我国最广大人民群众；只有马克思主义中国化最新成果才能指引我国改革开放和社会主义现代化建设的正确方向。符合时代要求的宪法才能反映我国各族人民共同意志和根本利益，才是我们国家和人民经受住各种困难和风险考验、始终沿着中国特色社会主义道路前进的根本法治保障。\r\n\r\n \r\n\r\n \r\n\r\n(责编：董晓伟、黄策舆', null, '0000-00-00 00:00:00', null, null, '0', '0', null, '0', '');
INSERT INTO `police_product` VALUES ('3', '333', '33', null, null, null, null, '0', '0', null, '0', '');

-- ----------------------------
-- Table structure for police_role
-- ----------------------------
DROP TABLE IF EXISTS `police_role`;
CREATE TABLE `police_role` (
  `id` int(2) NOT NULL AUTO_INCREMENT,
  `role_id` char(4) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

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
  `science_name` varchar(100) DEFAULT NULL,
  `title` varchar(150) DEFAULT NULL,
  `recommendation` varchar(255) DEFAULT NULL,
  `thumb` varchar(255) DEFAULT NULL,
  `content` longtext,
  `short_video` varchar(255) DEFAULT NULL,
  `add_time` datetime DEFAULT NULL,
  `userid` int(3) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of police_science
-- ----------------------------
INSERT INTO `police_science` VALUES ('1', '科技人', '科技', '科技', null, '科技', null, '2018-05-14 10:05:14', '1');

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
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_esperanto_ci COMMENT='用户基本信息表';

-- ----------------------------
-- Records of police_user
-- ----------------------------
INSERT INTO `police_user` VALUES ('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'admin@qq.com', '18180053005', '超级管理员', '0', '', '计算机', '管理员', '1', '0', '1', 'false', 'default');
INSERT INTO `police_user` VALUES ('8', '123456', 'e10adc3949ba59abbe56e057f20f883e', '11@qq.com', '18180053004', '张三', '0', '', '1', '1', '0', '0', '1', 'false', 'default');
INSERT INTO `police_user` VALUES ('10', '1234567', '1234567', '1234567@qq.com', '17628288479', '', '0', '', null, null, null, '0', '0', 'false', 'default');
