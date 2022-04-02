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

 Date: 03/04/2022 01:39:24
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
-- Records of admin_user
-- ----------------------------
BEGIN;
INSERT INTO `admin_user` (`Id`, `userName`, `password`, `email`, `qq`, `github`, `githubName`, `location`, `name`, `autograph`) VALUES (1, 'admin', '123456', '1********@email.com', '1*********', 'https://www.baidu.com', '我的GitHub', '中国', '我的博客', '这个是我的博客');
COMMIT;

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
-- Records of article
-- ----------------------------
BEGIN;
INSERT INTO `article` (`id`, `type_id`, `title`, `article_content`, `introduce`, `addTime`, `view_count`, `isTop`) VALUES (60, 100, 'vue3', '<div align=\"center\"> <a href=\"https://github.com/SuperCuteXiaoSi/xiaosiAdmin\"><h1>Vue3</h1></a>\n</div>\n\n## 简介\n\n### 分类\n\n基于`vue3`,`vite2`,`element-push`等主流技术开发的后台框架模板\n\n## 特性\n\n- **最新技术栈**：使用 Vue3/vite2 等前端前沿技术开发\n- **主题**：可配置的主题\n- **国际化**：内置完善的国际化方案\n\n## 准备\n\n- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境\n- [Vite](https://cn.vitejs.dev/) - 熟悉 vite 特性\n- [Vue3](https://v3.cn.vuejs.org/) - 熟悉 Vue 基础语法\n- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法\n- [Vue-Router-Next](https://next.router.vuejs.org/zh/) - 熟悉 vue-router 基本使用\n- [VueX v4.x](https://next.vuex.vuejs.org/zh/) - 熟悉 vue-router 基本使用\n- [element-push](https://element-plus.gitee.io/#/zh-CN/) - ui 基本使用\n\n## 安装使用\n\n- 获取项目代码（https or ssh）\n\n```bash\ngit clone https://github.com/SuperCuteXiaoSi/xiaosiAdmin.git\n\ngit clone git@github.com:SuperCuteXiaoSi/xiaosiAdmin.git\n```\n\n- 安装依赖\n\n```bash\ncd vite-vue3-Template\n\nnpm install\n\n# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题\n# 如果下载依赖慢可以使用淘宝镜像源安装依赖\nnpm install --registry=https://registry.npm.taobao.org\n\n```\n\n- 运行\n\n```bash\nnpm run dev\n```\n\n- 打包\n\n```bash\nnpm run build\n```\n\n## 项目地址\n\n- [vite-vue3-template](https://github.com/SuperCuteXiaoSi/xiaosiAdmin)\n\n## 如何贡献\n\n**Pull Request:**\n\n1. Fork 代码!\n2. 创建自己的分支: `git checkout -b feature/xxxx`\n3. 提交你的修改: `git commit -m \'feature: add xxxxx\'`\n4. 推送您的分支: `git push origin feature/xxxx`\n5. 提交`pull request`\n\n## Git 贡献提交规范\n\n- 参考 [vue](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md) 规范\n\n  - `feature` 增加新功能\n  - `fixbug` 修复问题/BUG\n  - `style` 不影响程序逻辑的代码修改(修改空白字符，格式缩进，补全缺失的分号等，没有改变代码逻辑)\n  - `perf` 优化/性能提升\n  - `refactor` 重构\n  - `revert` 撤销修改\n  - `docs` 文档/注释\n  - `chore` 依赖更新/脚手架配置修改等\n\n## 浏览器支持\n\n本地开发推荐使用`Chrome 80+` 浏览器\n\n支持现代浏览器, 不支持 IE\n\n| [<img src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png\" alt=\" Edge\" width=\"24px\" height=\"24px\" />](http://godban.github.io/browsers-support-badges/)</br>IE | [<img src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png\" alt=\" Edge\" width=\"24px\" height=\"24px\" />](http://godban.github.io/browsers-support-badges/)</br>Edge | [<img src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png\" alt=\"Firefox\" width=\"24px\" height=\"24px\" />](http://godban.github.io/browsers-support-badges/)</br>Firefox | [<img src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png\" alt=\"Chrome\" width=\"24px\" height=\"24px\" />](http://godban.github.io/browsers-support-badges/)</br>Chrome | [<img src=\"https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png\" alt=\"Safari\" width=\"24px\" height=\"24px\" />](http://godban.github.io/browsers-support-badges/)</br>Safari |\n| :-: | :-: | :-: | :-: | :-: |\n| not support | last 2 versions | last 2 versions | last 2 versions | last 2 versions |\n\n## 项目中使用的相关仓库\n\n### vite 相关：\n\n- [vite-plugin-compression](https://github.com/anncwb/vite-plugin-compression/) - 资源压缩支持 gzip or brotli\n- [vite-plugin-style-import](https://github.com/anncwb/vite-plugin-style-import/) - 动态引入组件库样式\n- [vite-plugin-svg-icons](https://github.com/anncwb/vite-plugin-svg-icons/) - svg 雪碧图\n- [vite-plugin-theme-preprocessor](https://github.com/GitOfZGT/vite-plugin-theme-preprocessor/) - 动态改变主题样式\n\n### 规范相关\n\n- [esLint](https://eslint.org/) - js 语法检测\n- [styleLint](https://stylelint.io/) - 样式语法检测\n- [commitLint](https://commitlint.js.org/#/) - git commit 提交规范检测\n\n## 项目目录结构\n\n```base\n.\n├── build                         #全局公共配置目录\n├── public                        #公共静态文件目录\n├── src                           #项目代码目录\n│   ├── App.vue                   #主vue模块\n│   ├── assets                    #项目静态文件目录\n│   ├── components                #公共组件\n│   ├── layouts                   #布局目录\n│   ├── locales                   #国际化配置\n│   ├── main.js                   #入口文件\n│   ├── router                    #路由\n│   ├── store                     #vuex\n│   ├── styles                    #公共样式\n│   ├── utils                     #公共方法\n│   └── views                     #存放vue页面目录\n├── LICENSE\n├── README.md\n├── .editorconfig                 #规范编译器编码样式文件\n├── .env.development              #开发环境变量\n├── .env.production               #生产环境变量\n├── .env.staging                  #测试环境变量\n├── .eslintrc.js                  #esLint配置文件\n├── .eslintrcignore               #esLint忽略配置文件\n├── stylelint.config.js           #styleLint配置文件\n├── .stylelintignore              #styleLint忽略配置文件\n├── commitlint.config.js          #commitLint配置文件\n├── prettier.config.js            #prettier配置文件\n├── .prettierignore               #prettier忽略配置文件\n├── index.html                    #根模板\n├── jsconfig.json\n├── package-lock.json\n├── package.json\n└── vite.config.js                #vite配置文件\n```\n\n## 维护者\n\n[@SuperCuteXiaoSi](https://github.com/SuperCuteXiaoSi)\n\n## License\n\n[MIT © 2021](./LICENSE)\n', '一款基于vue3+ts+elementPush+vite开发的后台模板', 1647958882, 94, 0);
INSERT INTO `article` (`id`, `type_id`, `title`, `article_content`, `introduce`, `addTime`, `view_count`, `isTop`) VALUES (61, 101, '测试置顶文章', '# Marked in Node.js\n\nRendered by **marked**.', '测试置顶文章', 1647959400, 15, 1);
INSERT INTO `article` (`id`, `type_id`, `title`, `article_content`, `introduce`, `addTime`, `view_count`, `isTop`) VALUES (65, 101, '测试新建文章修改2', '# Marked in Node.js\n\nRendered by **marked**.\nWX20220326-143452@2x.png\nCan not auto detect update condition, please set options.where, or make sure obj.id exists', '', 1648044187, 7, 0);
COMMIT;

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
-- Records of brief_article
-- ----------------------------
BEGIN;
COMMIT;

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

-- ----------------------------
-- Records of type
-- ----------------------------
BEGIN;
INSERT INTO `type` (`id`, `typeName`, `orderNum`) VALUES (100, 'vue', 1);
INSERT INTO `type` (`id`, `typeName`, `orderNum`) VALUES (101, 'JavaScript', 8);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
