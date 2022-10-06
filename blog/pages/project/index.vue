<script setup lang="ts">
import { useUserInfoStore } from '@/store/userInfo'
const { userData } = useUserInfoStore()
</script>

<template>
  <div class="project">
    <h3>项目</h3>
    <div class="content">
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
    </div>
    <h3>项目</h3>
    <div class="content">
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
    </div>
    <h3>项目</h3>
    <div class="content">
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
      <div class="flex-y item pointer">
        <span class="title">vue-xs-admin</span>
        <span class="text">基于Vue3,Vite3,Element-Plus等主流技术开发的开箱即用后台模板</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  max-width: 624px;
  height: 100%;
  margin: auto;

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    grid-template-rows: repeat(auto-fit, 100px);
    grid-column-gap: var(--margin);
    grid-row-gap: var(--margin);
    justify-content: center;

    .item {
      justify-content: center;
      align-items: flex-start;
      padding: var(--padding-sm);
      border-radius: 5px;
      transition: 0.5s;

      .title {
        line-height: 26px;
        font-weight: 500;
        font-size: 18px;
      }

      .text {
        font-size: var(--font-size);
        color: var(--text-color2);
      }
    }

    .item:hover {
      box-shadow: 0 0px 10px rgba(0, 0, 0, 0.12);
    }
  }
}
</style>
