import { Application } from 'egg';

import blog from './router/blog';
import admin from './router/admin';
import tyoe from './router/type';
import article from './router/article';


export default (app: Application) => {
  const { controller, router } = app;
  console.log(blog(app));
  router.get('/', controller.home.index);
  blog(app);
  admin(app);
  tyoe(app);
  article(app);
};
