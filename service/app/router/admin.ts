import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.post('/api/admin/login', controller.admin.index.checkLogin);
  router.post(
    '/api/admin/update_user',
    adminauth,
    controller.admin.index.updateUserInfo,
  );
  router.get('/api/admin/getToken', controller.admin.index.getToken);
  router.get('/api/blog/userInfo', controller.admin.index.getUserInfo);
};
