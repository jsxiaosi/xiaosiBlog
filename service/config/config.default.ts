import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1646996200394_5014';

  // add your egg config in here
  config.middleware = [];

  config.emailConfig = {
    host: 'smtp.**.com', // QQ邮箱的SMTP地址
    secureConnection: true, // 启动SSL
    port: 465, // 邮箱的端口号一般都使用465，
    auth: {
      user: '**@qq.com', // 你自己的邮箱的邮箱地址
      pass: '**********', // 授权码
    },
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  config.security = {
    csrf: {
      enable: false,
      headerName: 'x-csrf-token',
    },
    domainWhiteList: [ '*' ],
  };

  config.session = {
    key: 'TOKEN',
    maxAge: 2 * 3600 * 1000, // 2 小时
    httpOnly: true,
    encrypt: false,
    renew: true,
    // sameSite: 'none',
    // secure: false,
  };

  config.cors = {
    credentials: true, // 允许Cook可以跨域
  };

  // 配置数据库
  config.mysql = {
    client: {
      // host
      host: 'localhost',
      // 端口号
      port: '3306',
      // 用户名
      user: 'root',
      // 密码
      password: '123456',
      // 数据库名
      database: 'xiaosiblog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
