/*
 Navicat Premium Data Transfer

 Source Server         : mysql
 Source Server Type    : MySQL
 Source Server Version : 80028
 Source Host           : localhost:3306
 Source Schema         : xiaosiblog

 Target Server Type    : MySQL
 Target Server Version : 80028
 File Encoding         : 65001

 Date: 03/04/2022 01:07:22
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_user
-- ----------------------------
DROP TABLE IF EXISTS `admin_user`;
CREATE TABLE `admin_user` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `githubName` varchar(255) DEFAULT NULL,
  `location` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `autograph` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int NOT NULL DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `article_content` longtext NOT NULL,
  `introduce` text,
  `addTime` int DEFAULT NULL,
  `view_count` int NOT NULL DEFAULT '0',
  `isTop` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for brief_article
-- ----------------------------
DROP TABLE IF EXISTS `brief_article`;
CREATE TABLE `brief_article` (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_id` int DEFAULT '0',
  `title` varchar(255) NOT NULL DEFAULT '',
  `article_content` longtext CHARACTER SET utf8 COLLATE utf8_general_ci,
  `introduce` text,
  `addTime` int DEFAULT NULL,
  `article_id` int DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=67 DEFAULT CHARSET=utf8mb3;

-- ----------------------------
-- Table structure for type
-- ----------------------------
DROP TABLE IF EXISTS `type`;
CREATE TABLE `type` (
  `id` int NOT NULL AUTO_INCREMENT,
  `typeName` varchar(255) DEFAULT NULL,
  `orderNum` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM AUTO_INCREMENT=102 DEFAULT CHARSET=utf8mb3;

SET FOREIGN_KEY_CHECKS = 1;
