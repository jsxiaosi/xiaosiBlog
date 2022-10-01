<script setup lang="ts">
import timeFrom from '@/utils/timeFrom'
import { useDemoLeftBox } from '@/hook/close'

definePageMeta({
  layout: 'custom',
})

const { closeLeftBox } = useDemoLeftBox()

const config = useRuntimeConfig()

const { marked, tocItems } = useMarked()

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
    meta: [{ name: 'description', content: info.value.introduce }],
  })
}
</script>

<template>
  <div class="page">
    <div class="left-box">
      <div class="close" @click="closeLeftBox">
        X
      </div>
      <div class="container return">
        <NuxtLink class="pointer" to="/">
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
            <span>更新时间：{{
              timeFrom(info.update_time || info.addTime, false)
            }}</span>
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
