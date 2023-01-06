/* Layout */
// import Layout from '@/layouts/index.vue'
// import AppMain from '@/layouts/components/AppMain/index.vue'
import { AppRouteRecordRaw } from '#/route';
import { t } from '@/hooks/web/useI18n';

const Layout = () => import('@/layouts/pageLayouts/index.vue');

const safeManagerRoutes: Array<AppRouteRecordRaw> = [
  {
    path: '',
    component: Layout,
    redirect: '/welcome',
    name: 'home',
    alwaysShow: false,
    meta: { title: '', icon: 'iEL-home-filled' },
    children: [
      {
        path: 'welcome',
        name: 'RtWelcome',
        component: () => import('@/views/index/index.vue'),
        meta: { title: t('route.pathName.index') },
      },
    ],
  },
  {
    path: '/blog',
    component: Layout,
    redirect: '/blog/blogTable',
    name: 'blog',
    alwaysShow: true,
    meta: { title: t('route.pathName.blog'), icon: 'components' },
    children: [
      {
        path: 'addArticle',
        name: 'RfAddArticle',
        hidden: true,
        component: () => import('@/views/blog/addArticle/index.vue'),
        meta: { title: t('route.pathName.blog_addArticle'), keepAlive: true },
      },
      {
        path: 'blogTable',
        name: 'RfBlogTable',
        component: () => import('@/views/blog/blogTable/index.vue'),
        meta: { title: t('route.pathName.blog_blogTable'), keepAlive: true },
      },
      {
        path: 'briefArticle',
        name: 'RfBriefArticle',
        component: () => import('@/views/blog/briefArticle/index.vue'),
        meta: { title: t('route.pathName.blog_briefArticle'), keepAlive: true },
      },
    ],
  },
  {
    path: '/comment',
    component: Layout,
    redirect: '/comment/list',
    name: 'comment',
    alwaysShow: false,
    meta: { title: t('route.pathName.comment'), icon: 'components' },
    children: [
      {
        path: 'list',
        name: 'RfCommentList',
        component: () => import('@/views/comment/list/index.vue'),
        meta: { title: t('route.pathName.commentList'), keepAlive: true },
      },
    ],
  },
  {
    path: '/project',
    component: Layout,
    redirect: '/project/project_list',
    name: 'project',
    alwaysShow: false,
    meta: { title: t('route.pathName.project'), icon: 'components' },
    children: [
      {
        path: 'project_list',
        name: 'RfProjectList',
        component: () => import('@/views/project/list/index.vue'),
        meta: { title: t('route.pathName.projectList'), keepAlive: true },
      },
    ],
  },
  {
    path: '/type',
    component: Layout,
    redirect: '/type/blog_type',
    name: 'type',
    alwaysShow: false,
    meta: { title: t('route.pathName.type'), icon: 'components' },
    children: [
      {
        path: 'blog_type',
        name: 'RfBlogType',
        component: () => import('@/views/type/blogTable/index.vue'),
        meta: { title: t('route.pathName.blogType'), keepAlive: true },
      },
      {
        path: 'project_type',
        name: 'RfProjectType',
        component: () => import('@/views/type/projectTable/index.vue'),
        meta: { title: t('route.pathName.projectType'), keepAlive: true },
      },
    ],
  },
  {
    path: '/config',
    component: Layout,
    redirect: '/config/index',
    name: 'config',
    alwaysShow: false,
    meta: { title: t('route.pathName.config'), icon: 'components' },
    children: [
      {
        path: 'index',
        name: 'RfConfig',
        component: () => import('@/views/config/index.vue'),
        meta: { title: t('route.pathName.config'), keepAlive: true },
      },
    ],
  },
];

export default safeManagerRoutes;
