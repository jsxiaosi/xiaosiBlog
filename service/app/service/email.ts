import { Service } from 'egg';

export default class EmailService extends Service {
  async index(tmpArticle) {
    const { ctx } = this;
    const { nickname, contact, content } = tmpArticle;

    // 要发送的收件人地址
    const emailAccount = this.app.config.emailConfig.auth.user;
    // 定义模版
    const email = {
      title: '小斯博客评论',
      body: `
      <div style="display: flex; flex-direction: column; justify-content: space-between;">
        <span>
          来自：“${nickname}” 的评论
        </span>
        <span>
        联系方式：${contact}
        </span>
      </div>
      <p style="font-size: 14px;color:#000;">${content}</p> 
      `,
    };

    const emailCotent = {
      from: this.app.config.emailConfig.auth.user, // 发件人地址
      to: `${emailAccount}`, // 收件人地址，多个收件人可以使用逗号分隔
      subject: email.title, // 邮件标题
      html: email.body, // 邮件内容
    };
    return await ctx.sendEmail(this.app, emailCotent);
  }
}
