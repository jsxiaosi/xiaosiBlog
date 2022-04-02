import { Controller } from 'egg';

export default class BriefArticleController extends Controller {

  // 获得文章列表
  public async getBriefArticleList() {
    const { ctx, app } = this;
    const sql = `SELECT brief_article.id as id,
                 brief_article.title as title,
                 brief_article.introduce as introduce,
                 FROM_UNIXTIME(brief_article.addTime,'%Y-%m-%d' ) as addTime,
                 type.typeName as typeName
                 FROM brief_article LEFT JOIN type ON brief_article.type_id = type.Id
                 ORDER BY brief_article.id DESC LIMIT 0,10`;

    const resList = await app.mysql.query(sql);
    ctx.body = { data: resList, code: 1 };
  }

  // 根据文章ID得到文章详情，用于修改文章
  public async getBriefArticleInfo() {
    const { ctx, app } = this;
    const id = ctx.query.id;
    const result = await app.mysql.select('brief_article', {
      where: { id },
    });
    console.log(result);
    ctx.body = { data: result[0], code: 1 };
  }

  // 添加文章
  public async addBriefArticle() {
    const { ctx, app } = this;
    const tmpArticle = { ...ctx.request.body, addTime: new Date().getTime() / 1000 };
    const result = await app.mysql.insert('brief_article', tmpArticle) as unknown as EggMySQLUpdateResult;
    ctx.body = ctx.handleData(result);
  }

  // 修改文章
  public async updateBriefArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const result = await app.mysql.update('brief_article', tmpArticle);
    ctx.body = ctx.handleData(result);
  }

  // 删除文章
  public async delBriefArticle() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('brief_article', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}

