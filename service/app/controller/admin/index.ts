import { Controller } from 'egg';

export default class AdminController extends Controller {

  // 判断用户名密码是否正确
  public async checkLogin() {

    const { ctx, app } = this;

    console.log(ctx.get('x-csrf-token'))

    const { userName, password } = ctx.request.body;

    const sql = ` SELECT userName FROM admin_user WHERE userName = '${userName}' AND password = '${password}'`;

    const res = await app.mysql.query(sql);
    console.log('res', res);
    if (Array.isArray(res)) {
      if (res.length > 0) {
        // 登录成功,进行session缓存
        const openId = new Date().getTime();
        ctx.session.openId = { openId };
        ctx.body = {
          data: {
            openId,
            msg: '登陆成功',
          }, code: 1
        };
      } else {
        ctx.body = {
          code: -1,
          errMsg: '账号密码错误',
        };
      }
    } else {
      ctx.body = {
        code: -1,
        errMsg: '账号密码错误',
      };
    }
  }

  public async getToken() {
    const { ctx } = this

    const csrf = ctx.csrf
    ctx.state.csrf = csrf
    ctx.body = {
      code: 1,
      data: {
        token: csrf,
        msg: '成功'
      }
    };
  }

  public async getUserInfo() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const sql = `SELECT email, qq, github, githubName, location, name, autograph
                  FROM admin_user
                  WHERE  id = ${id}`;
    const userInfo = await app.mysql.query(sql);
    ctx.body = {
      userInfo:userInfo[0]
    };
  }
}

