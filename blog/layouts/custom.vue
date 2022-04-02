<template>
  <div class="main">
    <div class="main_title">
      <div class="head">
        <NuxtLink :to="`/`">
          <h2>xiaosi blog</h2>
        </NuxtLink>
      </div>
    </div>
    <div class="main_content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  layout: "custom",
}
</script>

<style lang="scss" scoped>
@import "@/assets/style/winodw.scss";
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
}
</style>