import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/api/article/article_list', controller.article.home.getArticleList);
  router.get('/api/article/article_info', controller.article.home.getArticleInfo);
  router.post('/api/article/add', adminauth, controller.article.home.addArticle);
  router.post('/api/article/update', adminauth, controller.article.home.updateArticle);
  router.delete('/api/article/delete', adminauth, controller.article.home.delArticle);
};
