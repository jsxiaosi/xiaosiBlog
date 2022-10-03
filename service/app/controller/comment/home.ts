import { Controller } from 'egg';

export default class CommentController extends Controller {
  // 后台分类列表
  public async getCommentList() {
    const { ctx, app } = this;
    const { count, pageSize } = ctx.request.body;
    console.log('count, pageSize', count, pageSize);
    const firstIndex = (count - 1) * pageSize;
    const lastIndex = count * pageSize;
    const sql = `SELECT comment.id as id,
                 comment.isSelected as isSelected,
                 comment.state as state,
                 comment.blogId as blogId,
                 comment.content as content,
                 comment.nickname as nickname,
                 comment.contact as contact,
                 comment.dateTime as dateTime,
                 DATE_FORMAT(comment.dateTime,'%Y-%m-%d %H:%i:%s' ) as dateTime,
                 article.title as blogTitle
                 FROM comment LEFT JOIN article ON comment.blogId = article.id
                 ORDER BY comment.id DESC LIMIT ${firstIndex},${lastIndex}`;

    const sql2 = 'SELECT COUNT(*) as tooles FROM comment';
    const resList = await app.mysql.query(sql);
    const total = await app.mysql.query(sql2);

    ctx.body = { data: { list: resList, total: total[0].tooles }, code: 1 };
  }

  // 获取前台列表
  public async getComment() {
    const { ctx, app } = this;
    const { id } = ctx.query;
    const resType = await app.mysql.select('comment', {
      where: {
        blogId: id,
        isSelected: 1,
      },
    });
    ctx.body = { data: resType, code: 1 };
  }

  public async addComment() {
    const { ctx, app } = this;
    const tmpArticle = {
      ...ctx.request.body,
      dateTime: ctx.formatTime(),
      isSelected: 0,
      state: 0,
    };
    const { nickname, contact, content } = tmpArticle;

    if (nickname && contact && content) {
      const result = (await app.mysql.insert(
        'comment',
        tmpArticle,
      )) as unknown as EggMySQLUpdateResult;
      ctx.body = ctx.handleData(result);
    } else {
      ctx.body = {
        errMsg: '添加失败',
        code: -1,
      };
    }
  }

  public async updateComment() {
    const { ctx, app } = this;
    delete ctx.request.body.blogTitle;
    const result = await app.mysql.update('comment', ctx.request.body);
    ctx.body = ctx.handleData(result);
  }

  public async deleteComment() {
    const { ctx, app } = this;
    const id = ctx.request.body.id;
    const res = await app.mysql.delete('comment', { id });
    if (res.affectedRows) {
      ctx.body = { data: { msg: '删除成功' }, code: 1 };
    } else {
      ctx.body = { errMsg: '删除失败，id不正确', code: -1 };
    }
  }

  // public async updateType() {
  //   const { ctx, app } = this;
  //   const result = await app.mysql.update('type', ctx.request.body);
  //   ctx.body = ctx.handleData(result);

  // }
}
