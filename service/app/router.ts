import { Application } from 'egg';

import blog from './router/blog'

export default (app: Application) => {
  const { controller, router } = app;
  console.log(blog(app))
  router.get('/', controller.home.index);
  blog(app);
};
