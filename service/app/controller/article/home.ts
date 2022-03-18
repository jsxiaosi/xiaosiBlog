import { Controller } from 'egg';

export default class ArticleController extends Controller {
  // 获得文章列表
  public async getArticleList() {
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'article.part_count as part_count ,' +
      'article.isTop as isTop ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.id DESC LIMIT 0,10';

    const resList = await this.app.mysql.query(sql);
    this.ctx.body = { data: resList, code: 1 };
  }

  // 根据文章ID得到文章详情，用于修改文章
  async getArticleInfo() {
    const { ctx, app } = this;
    const id = ctx.query.id;
    // const sql = 'SELECT article.id as id,' +
    //      'article.title as title,' +
    //      'article.introduce as introduce,' +
    //      'article.article_content as article_content,' +
    //      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
    //      'article.view_count as view_count ,' +
    //      'article.part_count as part_count ,' +
    //      'type.typeName as typeName ,' +
    //      'type.id as typeId ' +
    //      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
    //      'WHERE article.id=' + id;
    // const result = await app.mysql.query(sql);
    const result = await app.mysql.select('article', {
      where: { id },
    });
    console.log(result);
    this.ctx.body = { data: result[0], code: 1 };
  }

  // 添加文章
  public async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = { ...ctx.request.body, addTime: new Date().getTime() / 1000 };
    const result = await app.mysql.insert('article', tmpArticle) as unknown as EggMySQLUpdateResult;
    ctx.body = ctx.handleData(result);
  }

  // 修改文章
  public async updateArticle() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const result = await app.mysql.update('article', tmpArticle);
    ctx.body = ctx.handleData(result);
  }

  // 删除文章
  public async delArticle() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('article', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}

