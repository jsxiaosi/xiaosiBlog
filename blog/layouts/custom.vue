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
        </button> -->
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
  width: #{$--day-main-width};
  height: 100%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h2 {
    margin: 0;
  }
}
</style>
