<script setup lang="ts">
import { marked } from 'marked'
import hljs from 'highlight.js'
import timeFrom from '@/utils/timeFrom'
import 'highlight.js/styles/monokai-sublime.css'
import { useDemoLeftBox } from '@/hook/close'
const { closeLeftBox } = useDemoLeftBox()

const config = useRuntimeConfig()

interface TocItem {
  anchor: string
  level: number
  text: string
  children?: TocItem[]
}

const tocItems = ref<TocItem[]>([])
const index = ref<number>(0)

const add = (text: string, level: number) => {
  const anchor = `toc${level}${++index.value}`
  const item = { anchor, level, text }
  const items: TocItem[] = tocItems.value
  if (items.length === 0) { // 第一个 item 直接 push
    items.push(item)
  }
  else {
    let lastItem = items[items.length > 0 ? items.length - 1 : items.length] as TocItem // 最后一个 item

    if (item.level > lastItem.level) { // item 是 lastItem 的 children
      for (let i = lastItem.level + 1; i <= 2; i++) {
        const { children } = lastItem
        if (!children) { // 如果 children 不存在
          lastItem.children = [item]
          break
        }

        lastItem = children[children.length > 0 ? children.length - 1 : children.length] as TocItem // 重置 lastItem 为 children 的最后一个 item

        if (item.level <= lastItem.level) { // item level 小于或等于 lastItem level 都视为与 children 同级
          children.push(item)
          break
        }
      }
    }
    else { // 置于最顶级
      items.push(item)
    }
  }

  return anchor
}

const renderer = new marked.Renderer()
renderer.heading = function(text, level, raw) {
  const anchor = add(text, level)
  return `<a id=${anchor} name=${anchor} class="anchor-fix"><h${level}>${text}</h${level}></a>\n`
}

marked.setOptions({
  renderer,
  gfm: true,
  pedantic: false,
  sanitize: false,
  breaks: true,
  smartLists: true,
  smartypants: false,
  highlight(code) {
    return hljs.highlightAuto(code).value
  },
})

const html = ref('')
const route = useRoute()
const info = ref()
let id = 0
if (!isNaN(Number(route.params.id)))
  id = Number(route.params.id)
const { data } = await useFetch<{
  data: any
}>(`${config.baseURL}/api/blog/article_info`, { params: { id } })
if (data) {
  info.value = data.value.data
  html.value = marked(info.value.article_content)
  useHead({
    titleTemplate: info.value.title,
    meta: [
      { name: 'description', content: info.value.introduce },
    ],
  })
}

const back = () => {
  window.history.back()
}
</script>

<template>
  <div class="page">
    <div class="left-box">
      <div class="close" @click="closeLeftBox">
        X
      </div>
      <div class="container return">
        <NuxtLink class="pointer" :to="`/`">
          <i class="iconfont icon-fanhui" />
          <span>返回</span>
        </NuxtLink>
      </div>
      <div class="container">
        <div class="article_title">
          <h3>{{ info.title }}</h3>
        </div>
      </div>
      <div class="container">
        <span class="title">文章信息：</span>
        <ul>
          <li>
            <span>分类：{{ info.typeName }}</span>
          </li>
          <li>
            <span>阅读量：{{ info.view_count }}</span>
          </li>
          <li>
            <span>创建时间：{{ info.addTime }}</span>
          </li>
          <li>
            <span>更新时间：{{ timeFrom(info.update_time || info.addTime, false) }}</span>
          </li>
        </ul>
      </div>
      <div class="container">
        <span class="title">目录：</span>
        <ul>
          <li v-for="item in tocItems" :key="item.anchor" class="pointer">
            <a :href="`#${item.anchor}`">
              <i class="iconfont icon-wenjianjia icon" />
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="rigth-box cart markdown" v-html="html" />
  </div>
</template>

<style lang="scss" scoped>
.article_title {
  padding: 20px;
  border: 1px solid var(--border-color);
  padding: 25px 20px;
  background-color: var(--sub-color2);
  flex-wrap: 500;
  border-radius: 8px;

  h3 {
    margin: 0;
  }
}

.return {
  font-size: 14px;
  padding-top: 0;

  i {
    margin-right: 10px;
  }
}

.pointer {
  a:target {
    background-color: red;
  }
}
</style>
