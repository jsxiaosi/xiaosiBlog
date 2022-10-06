<script lang="ts" setup>
  import {
    articleListApi,
    delArticleApi,
    updateArticleIsTopApi,
    updateArticleStateApi,
  } from '@/api/blog';
  import { BlogModel } from '@/api/blog/blogModel';
  // import Form from '@/components/Form/index.vue';
  // import { FormProps } from '@/components/Form/types/from';
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
      label: '更新时间',
      prop: 'update_time',
    },
    {
      label: '浏览量',
      prop: 'view_count',
    },
    {
      label: '置顶',
      prop: 'isTop',
      isSlots: true,
    },
    {
      label: '隐藏文章',
      prop: 'state',
      isSlots: true,
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
    },
  ];

  const tabList = ref<BlogModel[]>([]);
  const total = ref<number>(0);
  const count = ref<number>(1);
  const pageSize = ref<number>(10);

  const currentChange = (e: number) => {
    count.value = e;
    getArticleList();
  };

  const getArticleList = async () => {
    const res = await articleListApi({ count: count.value, pageSize: pageSize.value });
    if (res) {
      tabList.value = res.list;
      total.value = res.total;
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
    router.push(`/blog/addArticle?id=${id}&type=article`);
  };

  const addAft = () => {
    router.push('/blog/addArticle?type=article');
  };

  const switchStateChange = async (_e: number, row: BlogModel) => {
    if (row.id) {
      const res = await updateArticleStateApi(row);
      if (res) getArticleList();
    }
  };

  const switchChange = async (e: number, row: BlogModel) => {
    console.log('asdasdasdasd', e, row);
    if (row.id) {
      const res = await updateArticleIsTopApi(row);
      if (res) getArticleList();
    }
  };
</script>
<template>
  <div class="page-container">
    <!-- <Form ref="formRef" :form-option="formOption" @submit-form="submitForm">
      <template #slotInput="{ formModel, formItem }">
        <el-input
          v-model="formModel[formItem.prop]"
          :type="formItem.inputType"
          placeholder="自定义输入框"
        ></el-input>
      </template>
    </Form> -->
    <el-button class="add" @click="addAft()">新建文章</el-button>

    <Table class="table" style="width: 100%" :attribute="attribute" :option="option">
      <template #isTop="slotData">
        <el-switch
          v-model="slotData.row.isTop"
          :active-value="1"
          :inactive-value="0"
          @change="(e: number) => switchChange(e, slotData.row)"
        />
      </template>
      <template #state="slotData">
        <el-switch
          v-model="slotData.row.state"
          :active-value="1"
          :inactive-value="0"
          @change="(e: number) => switchStateChange(e, slotData.row)"
        />
      </template>
      <template #operate="slotData">
        <div>
          <el-button @click="updateAft(slotData.row.id)">修改</el-button>
          <el-button @click="delAft(slotData.row)">删除</el-button>
        </div>
      </template>
    </Table>
    <el-pagination
      class="pagination"
      layout="prev, pager, next"
      :total="total"
      :page-size="pageSize"
      :current-page="count"
      @current-change="currentChange"
    />
  </div>
</template>
<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
    .add {
      width: 100px;
      align-self: flex-end;
    }
    .table {
      flex: 1;
      overflow-y: auto;
      margin: 20px 0;
    }
    .pagination {
      align-self: flex-end;
    }
  }
</style>
