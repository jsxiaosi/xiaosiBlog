<script setup lang="ts"></script>

<template>
  <div id="particles-js" class="main">
    <Nav />
    <div class="main_content">
      <slot />
    </div>

    <!-- <div class="_blank">
      <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44088102000146" style="display:inline-block;text-decoration:none;height:20px;line-height:20px;"><img src="@/assets/image/beian.png" style="float:left;"><p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px; color:#939393;">粤公网安备 44088102000146号</p></a>
    </div> -->
  </div>
</template>

<style lang="scss">
._blank {
  width: 100%;
  display: flex;
}
</style>
