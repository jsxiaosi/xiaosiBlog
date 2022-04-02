import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();

  router.get('/api/brief_article/list', controller.briefArticle.home.getBriefArticleList);
  router.get('/api/brief_article/info', controller.briefArticle.home.getBriefArticleInfo);
  router.post('/api/brief_article/add', adminauth, controller.briefArticle.home.addBriefArticle);
  router.post('/api/brief_article/update', adminauth, controller.briefArticle.home.updateBriefArticle);
  router.delete('/api/brief_article/delete', adminauth, controller.briefArticle.home.delBriefArticle);
};
