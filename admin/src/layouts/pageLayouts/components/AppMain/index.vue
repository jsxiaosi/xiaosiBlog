<script setup lang="ts">
  import { usePermissionStoreHook } from '@/store/modules/permission';
  import { computed } from 'vue';
  const getInclude = computed<string[]>(() => usePermissionStoreHook().cachePageList as string[]);
</script>

<template>
  <section class="app-main">
    <router-view>
      <template #default="{ Component }">
        <transition name="fade-transform" mode="out-in">
          <keep-alive :include="getInclude">
            <component :is="Component"></component>
          </keep-alive>
        </transition>
      </template>
    </router-view>
  </section>
</template>

<style lang="scss">
  .app-main {
    position: relative;
    width: 100%;
    height: calc(100vh - #{$navBarHeight+$BreadcrumbHeight});
    // min-height: calc(100vh - #{$navBarHeight+$BreadcrumbHeight});
    overflow: auto;
    padding: 20px;
    background-color: #{$app-main-bg-color};
  }

  .fixed-header + .app-main {
    padding-top: 50px;
  }
</style>
