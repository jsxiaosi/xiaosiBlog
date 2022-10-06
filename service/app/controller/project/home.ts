import { Controller } from 'egg';

export default class ProjectController extends Controller {
  public async list() {
    const { ctx, app } = this;
    // 查询列表
    const { count, pageSize } = ctx.request.body;
    const firstIndex = (count - 1) * pageSize;
    const lastIndex = count * pageSize;
    console.log(firstIndex, lastIndex);
    // 查询列表
    const sql = `SELECT project.id as id,
                 project.title as title,
                 project.url as url,
                 project.introduce as introduce,
                 project.sortId as sortId,
                 project_sort.name as sortName
                 FROM project LEFT JOIN project_sort ON project.sortId = project_sort.id`;

    const resList = await app.mysql.query(sql);

    ctx.body = { data: resList, code: 1 };
  }

  public async addProject() {
    const { ctx, app } = this;
    const result = (await app.mysql.insert(
      'project',
      ctx.request.body,
    )) as unknown as EggMySQLUpdateResult;
    ctx.body = ctx.handleData(result);
  }

  public async updateProject() {
    const { ctx, app } = this;
    const result = await app.mysql.update('project', ctx.request.body);
    ctx.body = ctx.handleData(result);
  }

  public async deleteProject() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('project', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}
