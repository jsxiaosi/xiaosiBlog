import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/api/project/list', controller.project.home.list);
  router.post(
    '/api/project/add',
    adminauth,
    controller.project.home.addProject,
  );
  router.post(
    '/api/project/update',
    adminauth,
    controller.project.home.updateProject,
  );
  router.delete(
    '/api/project/delete',
    adminauth,
    controller.project.home.deleteProject,
  );
};
