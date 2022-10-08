<script setup lang="ts">
  import SvgIcon from '@/components/SvgIcon/index.vue';
  import { useI18n } from '@/hooks/web/useI18n';
  defineProps({
    icon: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    className: {
      type: String,
      default: '',
    },
  });
  const { t } = useI18n();
</script>

<template>
  <SvgIcon :class-name="className" :name="icon" />
  <span v-if="title">{{ t(title) }}</span>
</template>

<style scoped>
  .sub-el-icon {
    /* color: currentColor; */
    width: 1em;
    height: 1em;
  }
</style>
