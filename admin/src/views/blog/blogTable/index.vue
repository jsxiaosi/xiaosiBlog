<template>
  <div class="page-container">
    <el-button @click="addAft()">新建文章</el-button>

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
  import { articleListApi, delArticleApi } from '@/api/blog';
  import { BlogModel } from '@/api/blog/blogModel';
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
      label: '浏览量',
      prop: 'view_count',
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
    },
  ];

  const tabList = ref<BlogModel[]>([]);

  const getArticleList = async () => {
    const res = await articleListApi();
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

  const delAft = async (info: BlogModel) => {
    ElMessageBox.confirm(`是否确认删除 ’${info.title}‘ 文章`, '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(async () => {
        const res = await delArticleApi({ id: info.id as number });
        if (res) getArticleList();
      })
      .catch(() => {});
  };

  const updateAft = (id: number) => {
    console.log(id);
    router.push(`/blog/addArticle?id=${id}`);
  };

  const addAft = () => {
    router.push('/blog/addArticle');
  };
</script>
<style lang="scss" scoped></style>
