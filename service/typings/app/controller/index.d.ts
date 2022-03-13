// This file is created by egg-ts-helper@1.30.2
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportHome from '../../../app/controller/home';
import ExportBlogIndex from '../../../app/controller/blog/index';

declare module 'egg' {
  interface IController {
    home: ExportHome;
    blog: {
      index: ExportBlogIndex;
    }
  }
}
