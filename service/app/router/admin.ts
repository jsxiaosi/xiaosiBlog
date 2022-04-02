import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/api/admin/login', controller.admin.index.checkLogin);
  router.get('/api/admin/getToken', controller.admin.index.getToken);
  router.get('/api/blog/userInfo',controller.admin.index.getUserInfo)
};
