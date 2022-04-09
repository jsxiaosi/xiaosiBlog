import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  meta: {
    title: '小斯博客',
    link: [
      {
        rel: 'icon', type: 'image/png', href: '/logo.png',
      },
    ],
  },
  css: [
    '@/assets/iconfont/iconfont.css',
    '@/assets/style/index.scss',
  ],
  buildModules: [
    '@vueuse/nuxt',
  ],
  vueuse: {
    ssrHandlers: true,
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/style/variables-day.scss";',
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
