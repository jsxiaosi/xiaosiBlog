<template>
  <div class="page-container">
    <Table :attribute="attribute" :option="option">
      <template #operate="slotData">
        <div>
          <el-button @click="updateAft(slotData.row.id)">修改</el-button>
          <el-button @click="delAft(slotData.row)">删除</el-button>
        </div>
      </template>
    </Table>
  </div>
</template>
<script lang="ts" setup>
  import { briefArticleListApi, delbriefArticleApi } from '@/api/briefArticle';
  import { BriefArticleModel } from '@/api/briefArticle/briefArticleModel';
  import Table from '@/components/Table/index.vue';
  import { ElMessageBox } from 'element-plus';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  // import { h } from 'vue';

  const router = useRouter();

  const option = [
    {
      label: 'id',
      prop: 'id',
    },
    {
      label: '标题',
      prop: 'title',
      // isSlots: true,
    },
    {
      label: '类别',
      prop: 'typeName',
    },
    {
      label: '创建时间',
      prop: 'addTime',
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
    },
  ];

  const tabList = ref<BriefArticleModel[]>([]);

  const getArticleList = async () => {
    const res = await briefArticleListApi();
    if (res) {
      tabList.value = res;
      attribute.data = tabList.value;
    }
  };

  getArticleList();

  const attribute = reactive({
    data: tabList.value,
    border: true,
  });

  const delAft = async (info: BriefArticleModel) => {
    ElMessageBox.confirm(`是否确认删除 ’${info.title}‘ 文章`, '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(async () => {
        const res = await delbriefArticleApi({ id: info.id as number });
        if (res) getArticleList();
      })
      .catch(() => {});
  };

  const updateAft = (id: number) => {
    console.log(id);
    router.push(`/blog/addArticle?id=${id}&type=brief`);
  };
</script>
<style lang="scss" scoped></style>
