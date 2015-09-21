/*
Navicat MySQL Data Transfer

Source Server         : node-b
Source Server Version : 50626
Source Host           : localhost:3306
Source Database       : blog

Target Server Type    : MYSQL
Target Server Version : 50626
File Encoding         : 65001

Date: 2015-09-21 17:25:01
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `web`
-- ----------------------------
DROP TABLE IF EXISTS `web`;
CREATE TABLE `web` (
  `ip` varchar(64) NOT NULL DEFAULT '',
  `visited` int(6) unsigned DEFAULT '0',
  PRIMARY KEY (`ip`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of web
-- ----------------------------
INSERT INTO `web` VALUES ('::ffff:127.0.0.1', '24');
