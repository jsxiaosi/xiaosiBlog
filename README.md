# xiaosiBlog
基于`Nuxt3`、`EggJs`等主流技术开发的博客系统

预览地址：https://www.jsxiaosi.com/

## 特性

- **最新技术栈**：使用 Nuxt3/Vue3/EggJs 等前端前沿技术开发
- **主题**：可配置的主题

## 准备

- [node](http://nodejs.org/) 和 [git](https://git-scm.com/) -项目开发环境
- [Vite](https://cn.vitejs.dev/) - 熟悉 vite 特性
- [Vue3](https://v3.cn.vuejs.org/) - 熟悉 Vue 基础语法
- [Es6+](http://es6.ruanyifeng.com/) - 熟悉 es6 基本语法
- [Nuxt3](https://v3.nuxtjs.org/) - 熟悉 Nuxt 基本使用
- [EggJs](https://www.eggjs.org/zh-CN) - 熟悉 EggJs 基本使用
- [MySql](https://dev.mysql.com/doc/refman/8.0/en/) - 熟悉 MySql 基本使用


## 安装使用

- 获取项目代码（https or ssh）

```bash
git clone https://github.com/jsxiaosi/xiaosiBlog.git

git clone git@github.com:jsxiaosi/xiaosiBlog.git
```

### 服务端

- 安装依赖

```bash
cd service

npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npm.taobao.org

```

#### 安装MySql  
MySql安装教程网上自行查找  

- 创建数据库：
```bash
CREATE DATABASE xiaosiblog
```
- 连接数据库：
```bash
use xiaosiblog
```
- 导入在项目根目录下xiaosiblog.sql的数据库配置
```bash
source ’文件的绝对路径‘/xiaosiblog.sql
```
- 修改EggJs配置  
打开service/config/config.default.ts
``` TypeScript
// 配置数据库
  config.mysql = {
    client: {
      // host
      host: 'localhost', // 连接地址
      // 端口号 
      port: '3306', // 端口号默认是3306
      // 用户名
      user: 'root', // 连接用户名
      // 密码
      password: '123456', // 数据库密码
      // 数据库名
      database: 'xiaosiblog', //数据库名称
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };
```

#### 开发环境
``` bash
npm run dev
```
预览：http://127.0.0.1:7001

#### 生产环境
由于项目是使用TypeScript为开发语言生产环境运行时需要使用tsc 将 ts 编译成 js，[具体原因](https://www.eggjs.org/zh-CN/tutorials/typescript#%E8%BF%90%E8%A1%8C-npm-start-%E4%B8%8D%E4%BC%9A%E5%8A%A0%E8%BD%BD-ts)
``` bash
npm run tsc
```
启动
```bash
npm run start
```

### 后台
后台使用的是[xiaosiAdmin](https://github.com/jsxiaosi/xiaosiAdmin)模板开发，详细内容请查看[项目详情](https://github.com/jsxiaosi/xiaosiAdmin)
- 安装依赖

```bash
cd admin

npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npm.taobao.org

```

#### 开发环境
``` bash
npm run dev
```

#### 生产环境
``` bash
npm run build
```

### 博客
```bash
cd blog

npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
# 如果下载依赖慢可以使用淘宝镜像源安装依赖
npm install --registry=https://registry.npm.taobao.org

```

#### 开发环境
``` bash
npm run dev
```
预览：http://127.0.0.1:3000


#### 生产环境
- 打包
``` bash
npm run build
```

- 启动
``` bash
npm run start
```

## 维护者

[@jsxiaosi](https://github.com/jsxiaosi)


## License

[MIT © 2022](./LICENSE)