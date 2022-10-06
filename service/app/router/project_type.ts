import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/api/project_type/list', controller.projectType.home.typeList);
  router.post(
    '/api/project_type/add',
    adminauth,
    controller.projectType.home.addType,
  );
  router.post(
    '/api/project_type/update',
    adminauth,
    controller.projectType.home.updateType,
  );
  router.delete(
    '/api/project_type/delete',
    adminauth,
    controller.projectType.home.deleteType,
  );
};
