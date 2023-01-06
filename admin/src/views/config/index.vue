<script setup lang="ts">
  import { articleAllIdApi } from '@/api/blog';
  import { baiduSEOApi } from '@/api/config';
  import { typeListApi } from '@/api/typeInfo';
  import { ElMessage } from 'element-plus';
  import { onMounted, ref } from 'vue';

  const linkList = ref<string[]>([
    'https://www.jsxiaosi.com/',
    'https://www.jsxiaosi.com/blog',
    'https://www.jsxiaosi.com/project',
  ]);

  onMounted(async () => {
    const typeList = await typeListApi();
    if (typeList) {
      const typeLink = typeList.map((i) => `https://www.jsxiaosi.com/blog/${i.id}`);
      linkList.value.push(...typeLink);
    }

    const idlist = await articleAllIdApi();
    if (idlist) {
      const idToLink = idlist.map((i) => `https://www.jsxiaosi.com/article_info/${i}`);
      linkList.value.push(...idToLink);
    }
  });

  const submitBaiduSeo = async () => {
    const res = await baiduSEOApi(linkList.value);
    if (res.success) {
      ElMessage({
        message: `提交成功！成功数：${res.success}，剩余数量：${res.remain}`,
        type: 'success',
        duration: 5000,
      });
    }
  };
</script>
<template>
  <div>
    <div class="link-content">
      <div v-for="item in linkList" :key="item">{{ item }}</div>
    </div>
    <ElButton type="primary" @click="submitBaiduSeo">提交SEO</ElButton>
  </div>
</template>
<style lang="scss" scoped>
  .link-content {
    width: 500px;
    height: 300px;
    border: 1px solid #e3e3e3;
    overflow-y: auto;
    margin-bottom: 12px;
  }
</style>
