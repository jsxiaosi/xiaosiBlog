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
    path: '/type',
    component: Layout,
    redirect: '/type/typeList',
    name: 'type',
    alwaysShow: true,
    meta: { title: t('route.pathName.type'), icon: 'components' },
    children: [
      {
        path: 'typeList',
        name: 'RfTypeList',
        component: () => import('@/views/type/typeTable/index.vue'),
        meta: { title: t('route.pathName.typeList'), keepAlive: true },
      },
    ],
  },
];

export default safeManagerRoutes;
