import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/blog', controller.blog.index.index);
  router.get('/blog/getArticleList', controller.blog.index.getArticleList);

};
