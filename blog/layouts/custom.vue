<script setup lang="ts">
const color = useColorMode()
function toggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
</script>

<!-- <script>
export default {
  layout: "custom",
}
</script> -->

<template>
  <div class="main">
    <div class="main_title">
      <div class="head">
        <NuxtLink :to="`/`">
          <h2>xiaosi blog</h2>
        </NuxtLink>
        <!-- <button class="!outline-none" @click="toggleDark()">
          切换主题
        </button>-->
        <div class="theme" :class="{ 'theme-dark': color === 'dark' }" @click="toggleDark">
          <div class="theme-inner" />
          <i class="iconfont icon-sun" />
          <i class="iconfont icon-moon" />
          <!-- <SvgIcon name="sun" />
          <SvgIcon name="moon" />-->
        </div>
      </div>
    </div>
    <div class="main_content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import "@/assets/style/winodw.scss";
.head {
  width: #{$--main-width};
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
  .theme {
    position: relative;
    width: 50px;
    height: 26px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: 151515;
    border: 1px solid var(--border-color);
    padding: 0 6px;
    font-size: 1em;
    border-radius: 30px;
    color: #f4ea2a;
    .theme-inner {
      position: absolute;
      z-index: 1;
      width: 18px;
      height: 18px;
      background-color: var(--border-color);
      border-radius: 50%;
      transition: transform 0.5s, background-color 0.5s;
      will-change: transform;
    }
  }
  .theme-dark {
    .theme-inner {
      transform: translateX(calc(100%));
    }
  }
}
</style>
