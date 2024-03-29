<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import type { RouteLocationMatched } from 'vue-router';
  import { ref, watch } from 'vue';
  import { getAppCollapseMenu } from '@/hooks/userAppWindow';
  import { useRoute, useRouter } from 'vue-router';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useAppStore } from '@/store/modules/app';

  const { t } = useI18n();

  const levelList = ref<Array<RouteLocationMatched>>([]);
  // 获取路由配置
  const router = useRouter();
  // 当前路由
  const route = useRoute();
  // 解析路由匹配的数组
  const getBreadcrumb = () => {
    // 过滤留下只有meta和title
    const matched: RouteLocationMatched[] = route.matched.filter(
      (item) => item.meta && item.meta.title,
    );
    // 拼出最终需要展示的跳转数据
    levelList.value = matched.filter(
      (item) => item.meta && item.meta.title && item.meta.breadcrumb !== false,
    );
  };
  // 手动解析path中可能存在的参数
  const pathCompile = (path: any) => {
    const toPath = path;
    return toPath(route.params);
  };
  // 跳转连接处理
  const handleLink = (item: any) => {
    const { redirect, path } = item;
    if (redirect) {
      router.push(redirect);
      return;
    }
    router.push(pathCompile(path));
  };
  // 首次调用
  getBreadcrumb();
  // 监控route的变化，避免组件复用信息同步问题
  watch(route, getBreadcrumb);

  // 当前是否折叠导航栏
  const { appConfigMode } = getAppCollapseMenu();
  const isAppConfigMode = ref(appConfigMode.value);
  const appStore = useAppStore();
  // 折叠菜单事件
  const handerShowElmenu = () => {
    isAppConfigMode.value.collapseMenu = !isAppConfigMode.value.collapseMenu;
    appStore.setAppConfigMode(isAppConfigMode.value);
  };
</script>

<template>
  <div class="breadcrumb">
    <!-- <i
			class="breadcrumb-icon"
			:class="[isCollapseMenu ? 'el-icon-s-unfold' : 'el-icon-s-fold']"
			@click="handerShowElmenu"
		></i>-->
    <SvgIcon
      class="breadcrumb-fold"
      :class="{ 'breadcrumb-unfold': isAppConfigMode.collapseMenu }"
      name="fold"
      color="#e3e3e3"
      @click="handerShowElmenu"
    ></SvgIcon>
    <el-breadcrumb class="app-breadcrumb" separator="/">
      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
        <span
          v-if="item.redirect === 'noRedirect' || index == levelList.length - 1"
          class="no-redirect"
          >{{ t(`${item.meta.title}`) }}</span
        >
        <a v-else class="redirect" @click.prevent="handleLink(item)">
          {{ t(`${item.meta.title}`) }}
        </a>
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<style lang="scss" scoped>
  .breadcrumb {
    display: flex;
    align-items: center;

    .breadcrumb-icon {
      margin-right: 20px;
      font-size: 20px;
    }

    .breadcrumb-fold {
      margin-right: 20px;
    }

    .breadcrumb-unfold {
      transform: rotate(180deg);
    }

    .app-breadcrumb.el-breadcrumb {
      // display: inline-block;
      // font-size: 14px;
      line-height: #{$BreadcrumbHeight};
      // margin-left: 8px;
      .redirect {
        color: $BreadcrumbText;
      }

      .no-redirect {
        color: #97a8be;
        cursor: text;
      }
    }
  }
</style>
