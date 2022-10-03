import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;
  const adminauth = app.middleware.adminauth();
  router.get('/api/comment/comment', controller.comment.home.getComment);
  router.post(
    '/api/comment/comment_list',
    controller.comment.home.getCommentList,
  );
  router.post('/api/comment/add_comment', controller.comment.home.addComment);
  router.post(
    '/api/comment/update',
    adminauth,
    controller.comment.home.updateComment,
  );
  router.delete(
    '/api/comment/delete',
    adminauth,
    controller.comment.home.deleteComment,
  );
};
