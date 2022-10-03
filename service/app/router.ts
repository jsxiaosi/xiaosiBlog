import { Application } from 'egg';

import admin from './router/admin';
import tyoe from './router/type';
import article from './router/article';
import brief_article from './router/brief_article';
import comment from './router/comment';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);
  admin(app);
  tyoe(app);
  article(app);
  brief_article(app);
  comment(app);
};
