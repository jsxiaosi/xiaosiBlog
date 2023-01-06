import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.post(
    '/api/config/baidu_seo',
    adminauth,
    controller.config.index.baiduSEO,
  );
};
