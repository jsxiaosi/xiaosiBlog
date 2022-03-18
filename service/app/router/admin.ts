import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  router.post('/api/admin/login', controller.admin.index.checkLogin);
};
