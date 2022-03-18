import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/api/type/type_list', controller.type.home.typeList);
  router.post('/api/type/add', adminauth, controller.type.home.addType);
  router.post('/api/type/update', adminauth, controller.type.home.updateType);
  router.delete('/api/type/delete', adminauth, controller.type.home.deleteType);
};
