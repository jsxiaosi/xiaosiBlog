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
  html.value = marked(data.value.data.article_content)
</script>

<template>
  <div id="particles-js" class="home">
    <img class="artificial" src="@/assets/image/logo.png">
    <div class="md-text markdown" v-html="html" />
  </div>
</template>

<style lang="scss">
.home {
  max-width: 624px;
  height: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  .artificial {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
  .md-text {
    margin-top: var(--margin);
    font-size: 16px;
  }
}
</style>
