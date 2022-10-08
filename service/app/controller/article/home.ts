import { Controller } from 'egg';
// const fs = require('fs');

interface ArticleType {
  id: number;
  isSelected: number;
  isRead: number;
  blogId: number;
  blogTitle: string;
  content: string;
  nickname: string;
  contact: string;
  dateTime: string;
  isTop: number;
}

export default class ArticleController extends Controller {
  private articleSqlString(condition?: string) {
    return `SELECT article.id as id,
    article.title as title,
    article.introduce as introduce,
    article.state as state,
    ${condition ? condition + ',' : ''} 
    FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime,
    DATE_FORMAT(article.update_time,'%Y-%m-%d %H:%i:%s' ) as update_time,
    article.view_count as view_count,
    article.isTop as isTop,
    type.typeName as typeName
    FROM article LEFT JOIN type ON article.type_id = type.id `;
  }

  // 客户端首页文章列表接口
  async blogArticleList() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const sql =
      this.articleSqlString() +
      `WHERE article.state != 0  AND article.type_id = ${
        id !== '0' ? id : 'type.id'
      } ORDER BY article.id DESC`;

    const sqlData: ArticleType[] = (await app.mysql.query(
      sql,
    )) as ArticleType[];

    const resList: ArticleType[] = [];
    const resTopList: ArticleType[] = [];

    sqlData.forEach(item => {
      if (item.isTop === 0) resList.push(item);
      else resTopList.push(item);
    });

    const resType = await app.mysql.select('type');

    ctx.body = {
      list: resList,
      type: resType,
      topList: resTopList,
    };
  }

  // 客户端得到详细页文章接口
  public async blogGetArticleInfo() {
    const { ctx, app } = this;
    const id = ctx.query.id;
    if (id) {
      const sql1 =
        'UPDATE article SET view_count = (view_Count+1) WHERE id =' + id;
      const updateResult = (await app.mysql.query(
        sql1,
      )) as EggMySQLUpdateResult;
      const updateSuccess = updateResult.affectedRows === 1;
      if (updateSuccess) {
        const sql2 =
          this.articleSqlString('article.article_content as article_content') +
          `WHERE article.id = ${id}`;
        const result = (await app.mysql.query(sql2)) as EggMySQLUpdateResult;

        const resType = await app.mysql.select('comment', {
          where: {
            blogId: id,
            isSelected: 1,
          },
        });
        ctx.body = { data: { blog: result[0], comment: resType }, code: 1 };
      }
    } else {
      ctx.body = {
        errMsg: 'id不正确',
        code: -1,
      };
    }
  }

  // 获得文章列表
  public async getArticleList() {
    const { ctx, app } = this;
    const { count, pageSize } = ctx.request.body;
    const firstIndex = (count - 1) * pageSize;
    const lastIndex = count * pageSize;
    // 查询列表
    const sql =
      this.articleSqlString() +
      `ORDER BY article.id DESC LIMIT ${firstIndex},${lastIndex}`;
    // 查询分页
    const sql2 = 'SELECT COUNT(*) as tooles FROM article';

    const resList = await app.mysql.query(sql);
    const total = await app.mysql.query(sql2);

    ctx.body = { data: { list: resList, total: total[0].tooles }, code: 1 };
  }

  // 根据文章ID得到文章详情，用于修改文章
  public async getArticleInfo() {
    const { ctx, app } = this;
    const id = ctx.query.id;
    const result = await app.mysql.select('article', {
      where: { id },
    });
    ctx.body = { data: result[0], code: 1 };
  }

  // 添加文章
  public async addArticle() {
    const { ctx, app } = this;
    const tmpArticle = {
      ...ctx.request.body,
      addTime: new Date().getTime() / 1000,
    };

    const sql =
      'UPDATE type SET orderNum = (orderNum+1) WHERE id =' + tmpArticle.type_id;
    const updateResult = (await app.mysql.query(sql)) as EggMySQLUpdateResult;
    const updateSuccess = updateResult.affectedRows === 1;
    if (updateSuccess) {
      const result = (await app.mysql.insert(
        'article',
        tmpArticle,
      )) as unknown as EggMySQLUpdateResult;
      ctx.body = ctx.handleData(result);
    } else {
      ctx.body = {
        errMsg: '添加失败，分类id不正确',
        code: -1,
      };
    }
  }

  // 上传文件
  public async upload() {
    const { ctx } = this;
    const data = await ctx.service.upload.index();
    if (data) {
      ctx.body = {
        data,
        code: 1,
      };
    } else {
      ctx.body = {
        message: '上传失败',
      };
    }
  }

  // 修改文章
  public async updateArticle() {
    const { ctx, app } = this;
    const tmpArticle = { ...ctx.request.body, update_time: ctx.formatTime() };
    ctx.updateOrderNum(app, tmpArticle);
    const result = await app.mysql.update('article', tmpArticle);
    ctx.body = ctx.handleData(result);
  }

  // 修改文章置顶信息
  public async updateState() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const sql =
      'update  article set state = ' +
      tmpArticle.state +
      ' where id = ' +
      tmpArticle.id;
    const updateResult = await app.mysql.query(sql);
    ctx.body = ctx.handleData(updateResult);
  }

  // 修改文章置顶信息
  public async updateIsTop() {
    const { ctx, app } = this;
    const tmpArticle = ctx.request.body;
    const sql =
      'update  article set isTop = ' +
      tmpArticle.isTop +
      ' where id = ' +
      tmpArticle.id;
    const updateResult = await app.mysql.query(sql);
    ctx.body = ctx.handleData(updateResult);
  }

  // 删除文章
  public async delArticle() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const typeIdSql = `SELECT article.type_id FROM article WHERE article.id = ${id}`;
    const getTypeId = await app.mysql.query(typeIdSql);
    const res = await app.mysql.delete('article', { id });
    if (res.affectedRows) {
      if (getTypeId[0]) {
        const sql =
          'UPDATE type SET orderNum = (orderNum-1) WHERE id =' +
          getTypeId[0].type_id;
        (await app.mysql.query(sql)) as EggMySQLUpdateResult;
      }

      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }
}
