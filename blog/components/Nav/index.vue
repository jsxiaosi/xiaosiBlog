<script setup lang="ts">
const color = useColorMode()
const thmeIconClass = computed(() => {
  if (color.value === 'dark')
    return 'iconfont icon-yejianmoshi'
  else return 'iconfont icon-baitian-qing'
})
function toggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}

function toGithub() {
  window.open('https://github.com/jsxiaosi/')
}
</script>

<template>
  <div class="flex-x nav">
    <div />

    <div class="rigth">
      <NuxtLink to="/blog">
        博客
      </NuxtLink>
      <NuxtLink to="/">
        项目
      </NuxtLink>
      <NuxtLink to="https://github.com/jsxiaosi/">
        <i class="iconfont icon-github" />
      </NuxtLink>
      <div class="pointer" @click="toggleDark">
        <i :class="thmeIconClass" />
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.nav {
  width: 100%;
  padding: var(--padding);
  align-items: center;
  justify-content: space-between;

  .rigth {
    display: grid;
    grid-gap: 1.2em;
    grid-auto-flow: column;
  }
}
</style>
