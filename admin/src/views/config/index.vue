<script setup lang="ts">
  import { articleAllIdApi } from '@/api/blog';
  import { baiduSEOApi } from '@/api/config';
  import { typeListApi } from '@/api/typeInfo';
  import { useMessage } from '@/hooks/web/useMessage';
  import { ElMessage } from 'element-plus';
  import { onMounted, ref } from 'vue';

  // 这里使用自己的域名
  const linkList = ref<string[]>([
    'https://www.you_url.com/',
  ]);

  const { createErrorMsg } = useMessage();

  onMounted(async () => {
    const typeList = await typeListApi();
    if (typeList) {
      const typeLink = typeList.map((i) => `https://www.you_url.com/blog/${i.id}`);
      linkList.value.push(...typeLink);
    }

    const idlist = await articleAllIdApi();
    if (idlist) {
      const idToLink = idlist.map((i) => `https://www.you_url.com/article_info/${i}`);
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
    } else {
      createErrorMsg(`提交失败！状态码：${res.error}，错误信息：${res.message}`);
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
