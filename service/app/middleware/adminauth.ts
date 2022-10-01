module.exports = () => {
  return async function adminauth(ctx, next) {
    console.log(ctx);
    await next();
    // if (ctx.session.openId) {
    //   await next();
    // } else {
    //   ctx.status = 401;
    //   ctx.body = { data: '没有登录' };
    // }
  };
};
