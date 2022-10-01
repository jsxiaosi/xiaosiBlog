<script setup lang="ts">
import { useDemoLeftBox } from '@/hook/close'
const { showLeftBox } = useDemoLeftBox()
const color = useColorMode()
function toggleDark() {
  color.value = color.value === 'dark' ? 'light' : 'dark'
}
// const showLeft = () => {
//   const leftDemo = document.getElementsByClassName('left-box') as unknown as HTMLElement[]
//   leftDemo[0].style.transform = 'translateX(0px)'
// }
</script>

<!-- <script>
export default {
  layout: "custom",
}
</script> -->

<template>
  <div class="main">
    <a
      href="https://github.com/jsxiaosi"
      class="github-corner"
      aria-label="View source on GitHub"
    ><svg
      width="80"
      height="80"
      viewBox="0 0 250 250"
      style="
          color: currentColor;
          position: absolute;
          z-index: 0;
          top: 55px;
          border: 0;
          right: 0;
        "
      aria-hidden="true"
    >
      <path d="M0,0 L115,115 L130,115 L142,142 L250,250 L250,0 Z" />
      <path
        d="M128.3,109.0 C113.8,99.7 119.0,89.6 119.0,89.6 C122.0,82.7 120.5,78.6 120.5,78.6 C119.2,72.0 123.4,76.3 123.4,76.3 C127.3,80.9 125.5,87.3 125.5,87.3 C122.9,97.6 130.6,101.9 134.4,103.2"
        fill="currentColor"
        style="transform-origin: 130px 106px"
        class="octo-arm"
      />
      <path
        d="M115.0,115.0 C114.9,115.1 118.7,116.5 119.8,115.4 L133.7,101.6 C136.9,99.2 139.9,98.4 142.2,98.6 C133.8,88.0 127.5,74.4 143.8,58.0 C148.5,53.4 154.0,51.2 159.7,51.0 C160.3,49.4 163.2,43.6 171.4,40.1 C171.4,40.1 176.1,42.5 178.8,56.2 C183.1,58.6 187.2,61.8 190.9,65.4 C194.5,69.0 197.7,73.2 200.1,77.6 C213.8,80.2 216.3,84.9 216.3,84.9 C212.7,93.1 206.9,96.0 205.4,96.6 C205.1,102.4 203.0,107.8 198.3,112.5 C181.9,128.9 168.3,122.5 157.7,114.1 C157.9,116.9 156.7,120.9 152.7,124.9 L141.0,136.5 C139.8,137.7 141.6,141.9 141.8,141.8 Z"
        fill="currentColor"
        class="octo-body"
      /></svg></a>
    <div class="main_title">
      <div class="head">
        <img
          class="head_image"
          src="@/assets/image/logo.png"
          @click="showLeftBox"
        >
        <NuxtLink to="/">
          <h2>xiaosi blog</h2>
        </NuxtLink>
        <!-- <button class="!outline-none" @click="toggleDark()">
          切换主题
        </button> -->
        <div
          class="theme"
          :class="{ 'theme-dark': color === 'dark' }"
          @click="toggleDark"
        >
          <div class="theme-inner" />
          <i class="iconfont icon-sun" />
          <i class="iconfont icon-moon" />
          <!-- <SvgIcon name="sun" />
          <SvgIcon name="moon" /> -->
        </div>
      </div>
    </div>
    <div class="blog_content">
      <slot />
    </div>
  </div>
</template>

<style lang="scss" scoped>
// @import "@/assets/style/winodw.scss";
.head {
  width: var(--main-width);
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .head_image {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: none;
  }

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

.github-corner {
  color: var(--main-color);
  fill: var(--text-color);
}

.github-corner:hover .octo-arm {
  animation: octocat-wave 560ms ease-in-out;
}

@keyframes octocat-wave {
  0%,
  100% {
    transform: rotate(0);
  }

  20%,
  60% {
    transform: rotate(-25deg);
  }

  40%,
  80% {
    transform: rotate(10deg);
  }
}

@media (max-width: 920px) {
  .github-corner {
    display: none;
  }
}

@media (max-width: 500px) {
  .github-corner:hover .octo-arm {
    animation: none;
  }

  .github-corner .octo-arm {
    animation: octocat-wave 560ms ease-in-out;
  }
}
</style>
