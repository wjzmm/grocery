/*
Navicat MySQL Data Transfer

Source Server         : myPc
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : node-spider

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2015-08-15 17:58:28
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `internfair`
-- ----------------------------
DROP TABLE IF EXISTS `internfair`;
CREATE TABLE `internfair` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL,
  `address` varchar(64) DEFAULT NULL,
  `time` datetime DEFAULT NULL,
  `deadline` datetime DEFAULT NULL,
  `status` varchar(12) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `school` varchar(32) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `scantime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of internfair
-- ----------------------------
INSERT INTO `internfair` VALUES ('000031', '壳牌实习生宣讲会', null, '2015-03-10 18:30:00', '2015-03-10 08:30:00', '[过期]', 'http://job.xjtu.edu.cn:80/meetingsHtml/78038363.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `internfair` VALUES ('000032', '摩根士丹利实习生招聘宣讲', null, '2015-03-31 18:30:00', '2015-03-31 08:30:00', '[过期]', 'http://job.xjtu.edu.cn/meeting/78332140;jsessionid=5965C69AB9129F7B520C93001EF73FA5', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `internfair` VALUES ('000033', '西安交通大学2013年暑期实习生招聘会', null, '2015-05-17 09:00:00', '2015-05-17 05:00:00', '[过期]', 'http://job.xjtu.edu.cn:80/meetingsHtml/49252445.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `internfair` VALUES ('000034', '中国工程物理研究院暑期实习生', null, '2015-05-21 19:00:00', '2015-05-21 09:00:00', '[过期]', 'http://job.xjtu.edu.cn:80/meetingsHtml/48103738.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `internfair` VALUES ('000035', '广州百田信息科技有限公司暑期实习生', null, '2015-05-09 19:00:00', '2015-05-09 09:00:00', '[过期]', 'http://job.xjtu.edu.cn:80/meetingsHtml/47562545.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `internfair` VALUES ('000036', '施耐德电气暑期实习生招聘', null, '2015-05-06 19:00:00', '2015-05-06 09:00:00', '[过期]', 'http://job.xjtu.edu.cn:80/meetingsHtml/47410004.html', '西安交通大学', null, '2015-08-10 10:15:02');

-- ----------------------------
-- Table structure for `job`
-- ----------------------------
DROP TABLE IF EXISTS `job`;
CREATE TABLE `job` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL,
  `time` date DEFAULT NULL,
  `status` varchar(12) DEFAULT NULL,
  `url` varchar(256) DEFAULT NULL,
  `school` varchar(32) DEFAULT NULL,
  `type` varchar(32) DEFAULT NULL,
  `scantime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=147 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of job
-- ----------------------------
INSERT INTO `job` VALUES ('000101', '新疆阿克苏市引进优秀人才', '2015-07-14', null, 'http://job.xjtu.edu.cn:80/jobsHtml/179964846.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000102', '关于重点高校泰州籍学生暑期见习活动的申报通知', '2015-06-09', null, 'http://job.xjtu.edu.cn/jobView.do;jsessionid=BDEA95F0CCD68C40B92AFF5F1D2A266A?id=167235366', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000103', '2015年上海电气电站集团 E-Power 暑期夏令营征集', '2015-06-08', null, 'http://job.xjtu.edu.cn:80/jobsHtml/166823726.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000104', '中原油田2015年招收博士后研究人员公告', '2015-06-02', null, 'http://job.xjtu.edu.cn:80/jobsHtml/165437165.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000105', '北京派特恩知识产权代理有限公司西安分公司招聘涉外专利代理人', '2015-08-06', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180320523.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000106', '卡特彼勒+2016/2017实习生（内燃机相关专业）', '2015-08-06', null, 'http://job.xjtu.edu.cn/jobView.do;jsessionid=BDEA95F0CCD68C40B92AFF5F1D2A266A?id=180320507', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000107', '西部证券股份有限公司招聘固定收益业务实习生', '2015-08-06', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180320504.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000108', '北京好未来集团在线教育管理培训生招聘', '2015-08-04', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180320377.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000109', '北京中建柏利工程技术发展有限公司+研发工程师+博士', '2015-08-04', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180320370.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000110', '北京中建柏利工程技术发展有限公司+BIM研发工程师+硕士', '2015-08-04', null, 'http://job.xjtu.edu.cn/jobView.do;jsessionid=BDEA95F0CCD68C40B92AFF5F1D2A266A?id=180320365', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000111', '淮阴工学院公开招聘工作人员公告', '2015-08-04', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180320360.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000112', '华泰证券2016校园招聘预热启动——系统开发、交互设计专场', '2015-08-03', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180299469.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000113', '澳大利亚资产投资公司招聘投资顾问', '2015-08-03', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180299466.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000114', '艾麦欧（上海）建筑设计咨询有限公司招聘', '2015-08-03', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180299461.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000115', '青岛海洋电气设备检测有限公司招聘电气工程师', '2015-07-31', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180288877.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000116', '陕西紫辰科技有限公司 急聘网页美工设计师', '2015-07-31', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180288872.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000117', '国金证券股份有限公司招聘证券投顾顾问（管培生）', '2015-07-31', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180288850.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000118', '北京中建柏利工程技术发展有限公司+招聘+研发工程师+博士', '2015-07-29', null, 'http://job.xjtu.edu.cn/jobView.do;jsessionid=BDEA95F0CCD68C40B92AFF5F1D2A266A?id=180288764', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000119', '西安中科光电精密工程有限公司招聘电子电路、机械及软件研发人员', '2015-07-28', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180267882.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000120', '深圳标准技术研究院电商所招聘', '2015-07-27', null, 'http://job.xjtu.edu.cn:80/jobsHtml/180267831.html', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `job` VALUES ('000121', '陕西致家贸易有限公司', '2015-07-24', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29545.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000122', '【智享会·宁波银行科技专场】启动报名！', '2015-07-22', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29544.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000123', '陕西裕诚隆泰集团', '2015-07-17', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29543.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000124', '长安国际信托股份有限公司招聘', '2015-07-16', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29542.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000125', '重庆会凌电子新技术有限公司', '2015-07-14', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29539.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000126', '阿克苏市人才引进', '2015-07-10', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29538.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000127', '信威集团2016年校园招聘', '2015-07-10', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29537.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000128', '浙江大学招聘', '2015-07-09', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29536.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000129', '中科院微电子研究所', '2015-07-07', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29535.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000130', '深圳市慧大成智能科技有限公司', '2015-07-03', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29534.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000131', '阿里巴巴集团', '2015-07-03', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29533.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000132', '西安交大捷普网络科技有限公司暑期实习招聘', '2015-06-30', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29531.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000133', '深圳市揽行科技有限公司', '2015-06-25', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29530.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000134', '渤海银行', '2015-06-25', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29529.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000135', '丽水中澳线控科技有限公司', '2015-06-25', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29528.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000136', '摩比科技(西安)有限公司暑期实习招聘', '2015-06-25', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29527.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000137', 'Inspur Open Day——浪潮集团2015年大学生开放日', '2015-06-24', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29525.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000139', '云南财经大学2015年招聘事业编制计算机硕士研究生', '2015-06-19', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29523.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000140', '西安龙泽雅荷教育学校', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29522.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000141', ' 中信建投证券股份有限公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29521.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000142', '甘肃上航电力运维有限公司西安分公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29520.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000143', '安科瑞电气股份有限公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29519.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000144', '无锡七酷网络科技有限公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29518.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000145', '三星(中国)半导体有限公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29516.html', '西安电子科技大学', null, '2015-08-10 10:15:03');
INSERT INTO `job` VALUES ('000146', '陕西昱琛航空设备有限公司', '2015-06-18', null, 'http://job.xidian.edu.cn/html/zpxx/jobs/29515.html', '西安电子科技大学', null, '2015-08-10 10:15:03');

-- ----------------------------
-- Table structure for `jobfair`
-- ----------------------------
DROP TABLE IF EXISTS `jobfair`;
CREATE TABLE `jobfair` (
  `id` int(6) unsigned zerofill NOT NULL AUTO_INCREMENT,
  `title` varchar(32) DEFAULT NULL COMMENT '招聘信息名称',
  `address` varchar(64) DEFAULT NULL COMMENT '招聘宣讲会所在地',
  `time` datetime DEFAULT NULL COMMENT '宣讲会时间',
  `deadline` datetime DEFAULT NULL COMMENT '截止日期',
  `status` varchar(12) DEFAULT NULL COMMENT '状态（过期/未过期）',
  `url` varchar(256) DEFAULT NULL COMMENT '详细信息链接',
  `school` varchar(32) DEFAULT NULL COMMENT '消息来源',
  `type` varchar(32) DEFAULT NULL COMMENT '宣讲会类别（计算机/经济..）',
  `scantime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=119 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of jobfair
-- ----------------------------
INSERT INTO `jobfair` VALUES ('000113', '强生HR校园行', null, '2015-04-25 19:00:00', '2015-04-25 09:00:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `jobfair` VALUES ('000114', '王品餐饮集团（取消）', null, '2015-04-23 10:00:00', '2015-04-23 12:00:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `jobfair` VALUES ('000115', '恩斯克（中国）研究开发有限公司', null, '2015-03-05 08:00:00', '2015-03-05 06:00:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `jobfair` VALUES ('000116', '富士施乐暑期实习生招聘', null, '2015-05-27 09:30:00', '2015-05-27 11:00:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `jobfair` VALUES ('000117', '软件学院', null, '2015-05-31 16:00:00', '2015-05-31 10:01:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
INSERT INTO `jobfair` VALUES ('000118', '河南灵宝市组织部招录事业单位', null, '2015-04-16 10:00:00', '2015-04-16 12:00:00', '[过期]', '#', '西安交通大学', null, '2015-08-10 10:15:02');
