<script setup lang="ts">
useCanvasBg()
</script>

<template>
  <div class="main">
    <div>
      <canvas id="myCanvas" class="canvas" />
    </div>
    <Nav />
    <div class="main_content">
      <slot />
    </div>
    <div class="flex-x _blank">
      <div class="flex-x item">
        <a
          target="_blank"
          href="https://beian.miit.gov.cn/"
          style="
            display: inline-block;
            text-decoration: none;
            height: 20px;
            line-height: 20px;
          "
        ><img src="@/assets/image/beian.png" style="float: left">
          <p
            style="
              float: left;
              height: 20px;
              line-height: 20px;
              margin: 0px 0px 0px 5px;
              color: #939393;
            "
          >
            ICP备案内容区域
          </p>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.canvas {
  pointer-events: none;
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: -1;
}

._blank {
  width: 100%;
  height: 40px;
  align-items: center;
  justify-content: center;

  .item {
    // width: 300px;
    align-items: center;
  }
}
</style>
