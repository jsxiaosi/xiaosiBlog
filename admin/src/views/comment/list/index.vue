<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import Table from '@/components/Table/index.vue';
  import { commentListApi, deleteCommentApi, updateCommentApi } from '@/api/comment';
  import { CommentModel } from '@/api/comment/commentModel';
  import { ElMessage, ElMessageBox } from 'element-plus';

  const attribute = reactive<{ data: CommentModel[]; border: boolean }>({
    data: [],
    border: true,
  });

  const commentVisible = ref<boolean>(false);
  const commentInfo = ref<CommentModel>();

  const option = [
    {
      label: 'id',
      prop: 'id',
    },
    {
      label: '博客标题',
      prop: 'blogTitle',
      // isSlots: true,
    },
    {
      label: '昵称',
      prop: 'nickname',
    },
    {
      label: '联系方式',
      prop: 'contact',
    },
    {
      label: '时间',
      prop: 'dateTime',
    },
    {
      label: '精选',
      prop: 'isSelected',
      isSlots: true,
    },
    {
      label: '状态',
      prop: 'state',
      isSlots: true,
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
    },
  ];

  onMounted(() => {
    getCommentList();
  });

  const total = ref<number>(0);
  const count = ref<number>(1);
  const pageSize = ref<number>(10);

  const getCommentList = async () => {
    const res = await commentListApi({ count: count.value, pageSize: pageSize.value });
    attribute.data = res.list;
  };

  const update = async (info: CommentModel) => {
    const res = await updateCommentApi(info);
    if (res.msg) {
      getCommentList();
      ElMessage({
        message: '更新成功',
        type: 'success',
      });
    }
  };

  const switchChange = (e: number, info: CommentModel) => {
    if (info.id) update({ ...info, isSelected: e });
  };

  const seeChange = (info: CommentModel) => {
    if (info.state === 0) update({ ...info, state: 1 });
    commentInfo.value = info;
    commentVisible.value = true;
  };

  const delAft = (info: CommentModel) => {
    ElMessageBox.confirm(`是否确认删除 ’${info.nickname} - ${info.dateTime}‘ 的评论`, '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(async () => {
        const res = await deleteCommentApi(info.id);
        if (res) getCommentList();
      })
      .catch(() => {});
  };

  const currentChange = (e: number) => {
    count.value = e;
    getCommentList();
  };
</script>
<template>
  <div class="page-container">
    <Table class="table" style="width: 100%" :attribute="attribute" :option="option">
      <template #isSelected="slotData">
        <el-switch
          v-model="slotData.row.isSelected"
          :active-value="1"
          :inactive-value="0"
          @change="(e: number) => switchChange(e, slotData.row)"
        />
      </template>
      <template #state="slotData">
        <span v-if="slotData.row.state === 1" style="color: #67c23a">已读</span>
        <span v-else style="color: #f56c6c">未读</span>
      </template>
      <template #operate="slotData">
        <div>
          <el-button @click="seeChange(slotData.row)">查看</el-button>
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

    <el-dialog
      v-model="commentVisible"
      :title="`来自：${commentInfo?.nickname} - ${commentInfo?.dateTime}的评论`"
    >
      <div>
        {{ commentInfo?.content }}
      </div>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .page-container {
    display: flex;
    flex-direction: column;
    height: 100%;
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
