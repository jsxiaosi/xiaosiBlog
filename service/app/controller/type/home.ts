import { Controller } from 'egg';

export default class TypeController extends Controller {
  // 后台分类列表
  public async typeList() {
    const { ctx, app } = this;
    const resType = await app.mysql.select('type');
    ctx.body = { data: resType, code: 1 };
  }

  public async addType() {
    const { ctx, app } = this;
    const result = await app.mysql.insert('type', ctx.request.body) as unknown as EggMySQLUpdateResult;
    ctx.body = ctx.handleData(result);
  }

  public async updateType() {
    const { ctx, app } = this;
    const result = await app.mysql.update('type', ctx.request.body);
    ctx.body = ctx.handleData(result);

  }

  // 删除分类
  public async deleteType() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('type', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}
