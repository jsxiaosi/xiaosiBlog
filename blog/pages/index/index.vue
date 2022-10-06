<script setup lang="ts">
import { useUserInfoStore } from '@/store/userInfo'

definePageMeta({
  layout: 'default',
})

const { marked } = useMarked()
const { userData } = useUserInfoStore()

const html = ref<string>(marked(userData.describeText || ''))
</script>

<template>
  <div id="particles-js" class="flex-y home">
    <img class="avatar" :src="userData.avatar">
    <div class="md-text markdown" v-html="html" />
  </div>
</template>

<style lang="scss" scoped>
.home {
  max-width: 624px;
  height: 100%;
  margin: auto;

  .avatar {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }

  .md-text {
    margin-top: var(--margin);
    font-size: var(--font-size-lg);
  }
}
@media (max-width: 920px) {
  .home {
    .avatar {
      width: 80px;
      height: 80px;
    }
  }
}
</style>
