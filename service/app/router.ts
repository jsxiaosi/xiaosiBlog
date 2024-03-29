import { Application } from 'egg';

import admin from './router/admin';
import config from './router/config';
import tyoe from './router/type';
import article from './router/article';
import brief_article from './router/brief_article';
import comment from './router/comment';
import project_type from './router/project_type';
import project from './router/project';

export default (app: Application) => {
  const { controller, router } = app;
  router.get('/', controller.home.index);
  admin(app);
  config(app);
  tyoe(app);
  article(app);
  brief_article(app);
  comment(app);
  project(app);
  project_type(app);
};
