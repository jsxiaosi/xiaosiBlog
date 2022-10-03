<script setup lang="ts">
definePageMeta({
  layout: 'default',
})

const config = useRuntimeConfig()

const { marked } = useMarked()

const html = ref<string>('')

const { data } = await useFetch<{
  data: any
}>(`${config.baseURL}/api/blog/article_info`, { params: { id: 76 } })

if (data)
  html.value = marked(data.value.data.blog.article_content)
</script>

<template>
  <div id="particles-js" class="flex-y home">
    <img class="artificial" src="@/assets/image/logo.png">
    <div class="md-text markdown" v-html="html" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 624px;
  height: 100%;
  margin: auto;

  .artificial {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .md-text {
    margin-top: var(--margin);
    font-size: var(--font-size-lg);
  }
}
</style>
