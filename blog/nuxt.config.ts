import { defineNuxtConfig } from 'nuxt/config'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  ssr: true,
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  meta: {
    title: '小斯博客',
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/logo.png',
      },
    ],
    meta: [
      {
        name: 'description',
        content:
          '读万卷书不如行万里路,行万里路不如阅人无数！千淘万漉虽心苦，吹尽狂沙始到金！',
      },
      {
        name: 'Keywords',
        content:
          'Vue,JavaScript,Nginx,Git,UniApp,Uni-App,Nuxt,React,前端,服务器,Linux,macOS,学习文档,笔记',
      },
    ],
  },
  build: {
    extractCSS: true,
  },
  css: ['@/assets/iconfont/iconfont.css', '@/assets/style/index.scss'],
  vueuse: {
    ssrHandlers: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/style/variable.scss";',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, ''),
        },
      },
    },
  },
  publicRuntimeConfig: {
    baseURL: 'http://127.0.0.1:7001',
  },
})
