<script setup lang="ts">
  import { PropType, ref } from 'vue';
  import { isExternal } from '@/utils/validate';
  import { AppRouteRecordRaw } from '#/route';
  import Item from './Item.vue';
  import AppLink from './Link.vue';

  const onlyOneChild = ref<any>({});
  const props = defineProps({
    // route object
    item: {
      type: Object as PropType<AppRouteRecordRaw>,
      default: () => {},
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  });

  const hasOneShowingChild = (
    children: Array<AppRouteRecordRaw> = [],
    parent: AppRouteRecordRaw,
  ) => {
    const showingChildren = children.filter((item: AppRouteRecordRaw) => {
      if (item.hidden) {
        return false;
      } else {
        // Temp set(will be used if only has one showing child)
        onlyOneChild.value = item;
        return true;
      }
    });

    // When there is only one child router, the child router is displayed by default
    if (showingChildren.length === 1) {
      return true;
    }

    // Show parent if there are no child router to display
    if (showingChildren.length === 0) {
      onlyOneChild.value = { ...parent, path: '', noShowingChildren: true };
      return true;
    }

    return false;
  };
  const resolvePath = (routePath: string) => {
    if (isExternal(routePath)) {
      return routePath;
    }
    if (isExternal(props.basePath)) {
      return props.basePath;
    }
    return `${props.basePath}${routePath ? '/' + routePath : routePath}`;
  };
</script>

<template>
  <div v-if="!item.hidden">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item
          :index="resolvePath(onlyOneChild.path)"
          :class="{ 'submenu-title-noDropdown': !isNest }"
        >
          <item
            class-name="menu-item-svg"
            :icon="onlyOneChild.meta.icon || (item.meta && item.meta.icon)"
            :title="onlyOneChild.meta.title"
          />
        </el-menu-item>
      </app-link>
    </template>

    <el-sub-menu v-else :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item
          v-if="item.meta"
          class-name="sub-menu-svg"
          :icon="item.meta && item.meta.icon"
          :title="item.meta.title"
        />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<style lang="scss" scoped></style>
