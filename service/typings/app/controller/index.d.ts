// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportAdminIndex from '../../../app/controller/admin/index';
import ExportArticleHome from '../../../app/controller/article/home';
import ExportBlogIndex from '../../../app/controller/blog/index';
import ExportTypeHome from '../../../app/controller/type/home';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    admin: {
      index: ExportAdminIndex;
    }
    article: {
      home: ExportArticleHome;
    }
    blog: {
      index: ExportBlogIndex;
    }
    type: {
      home: ExportTypeHome;
    }
  }
}
