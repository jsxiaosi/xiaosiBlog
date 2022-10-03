import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();

  router.get('/api/blog/article_list', controller.article.home.blogArticleList);
  router.get(
    '/api/blog/article_info',
    controller.article.home.blogGetArticleInfo,
  );
  router.post('/api/article/list', controller.article.home.getArticleList);
  router.get('/api/article/info', controller.article.home.getArticleInfo);
  router.post(
    '/api/article/add',
    adminauth,
    controller.article.home.addArticle,
  );
  router.post(
    '/api/article/update_top',
    adminauth,
    controller.article.home.updateIsTop,
  );
  router.post(
    '/api/article/update_state',
    adminauth,
    controller.article.home.updateState,
  );
  router.post(
    '/api/article/update',
    adminauth,
    controller.article.home.updateArticle,
  );
  router.post('/api/article/upload', adminauth, controller.article.home.upload);
  router.delete(
    '/api/article/delete',
    adminauth,
    controller.article.home.delArticle,
  );
};
