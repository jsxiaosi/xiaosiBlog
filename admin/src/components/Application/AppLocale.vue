<script setup lang="ts">
  import { useI18n, localesList } from '@/hooks/web/useI18n';
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useAppStore } from '@/store/modules/app';
  import { getAppCollapseMenu } from '@/hooks/userAppWindow';

  const i18n = useI18n();
  const appStore = useAppStore();
  const { appConfigMode } = getAppCollapseMenu();
  // const availableLocales = i18n.availableLocales;
  const tolochos = (key: string) => {
    i18n.locale.value = key;
    appConfigMode.value.locale = key;
    appStore.setAppConfigMode(appConfigMode.value);
  };

  // const options = ref([
  // 	{ name: '123', value: 'variables-theme-day' },
  // 	{ name: '456', value: 'variables-theme-dark' },
  // ])

  // const value = ref()

  // const toggleTheme = (scopeName = 'theme-default') => {
  // 	document.documentElement.className = scopeName
  // }
</script>

<template>
  <el-dropdown class="popover-content" trigger="click" @command="tolochos">
    <span>
      <SvgIcon class="icon" name="locales"></SvgIcon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="item in localesList" :key="item.locale" :command="item.locale">{{
          item.name
        }}</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .icon {
    color: #{$text-color-primary};
    font-size: 1em;
  }
</style>
