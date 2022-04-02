import { defineNuxtConfig } from 'nuxt3'

// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  css: [
    "@/assets/iconfont/iconfont.css",
    "@/assets/style/index.scss",
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "./assets/style/winodw.scss";',
        },
      },
    },
    server: {
      proxy: {
        '/api': {
          target: 'http://127.0.0.1:7001',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
    }
  },
  publicRuntimeConfig: {
    baseURL: "http://127.0.0.1:7001"
  }
})
