module.exports = () => {
  return async function adminauth(ctx, next) {
    console.log('ctx.session', ctx.session);
    if (ctx.session.openId) {
      await next();
    } else {
      ctx.status = 401;
      ctx.body = { data: '没有登录' };
    }
  };
};
