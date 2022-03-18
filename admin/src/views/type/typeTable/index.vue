<template>
  <div class="page-container">
    <el-button @click="addDialog()">新建分类</el-button>
    <Table :attribute="attribute" :option="option">
      <template #operate="slotData">
        <div>
          <el-button @click="updateDialog(slotData.row)">修改</el-button>
          <el-button @click="delType(slotData.row)">删除</el-button>
        </div>
      </template>
    </Table>
    <el-dialog v-model="dialogFormVisible" :title="typeInfo.id ? '修改分类名称' : '新增分类'">
      <el-input v-model="typeInfo.typeName" autocomplete="off" />
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="updateType">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
  // import { BlogModel } from '@/api/blog/blogModel';
  import Table from '@/components/Table/index.vue';
  import { reactive, ref } from 'vue';
  import { typeListApi, updateTypeApi, addTypeApi, deleteTypeApi } from '@/api/typeInfo';
  import { TypeInfoModel } from '@/api/typeInfo/typeInfoModel';
  import { ElMessageBox } from 'element-plus';
  // import { h } from 'vue';

  const option = [
    {
      label: 'id',
      prop: 'id',
    },
    {
      label: '分类名称',
      prop: 'typeName',
      // isSlots: true,
    },
    {
      label: '文章数量',
      prop: 'orderNum',
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
    },
  ];

  const typeList = ref<TypeInfoModel[]>([]);
  const getTypeList = async () => {
    const res = await typeListApi();
    if (res) {
      typeList.value = res;
      attribute.data = typeList.value;
    }
  };

  getTypeList();

  const attribute = reactive({
    data: typeList.value,
    border: true,
  });

  const dialogFormVisible = ref(false);
  const typeInfo = ref<TypeInfoModel>({} as TypeInfoModel);

  const addDialog = () => {
    typeInfo.value = {} as TypeInfoModel;
    dialogFormVisible.value = true;
  };

  const updateDialog = (info: TypeInfoModel) => {
    typeInfo.value = info;
    dialogFormVisible.value = true;
  };
  const delType = (info: TypeInfoModel) => {
    ElMessageBox.confirm(`是否确认删除 ’${info.typeName}‘ 分类`, '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(async () => {
        const res = await deleteTypeApi(info.id);
        if (res) {
          dialogFormVisible.value = false;
          getTypeList();
        }
      })
      .catch(() => {});
  };

  const updateType = async () => {
    let res;
    if (typeInfo.value.id) {
      res = await updateTypeApi(typeInfo.value);
    } else {
      res = await addTypeApi(typeInfo.value.typeName);
    }
    if (res) {
      dialogFormVisible.value = false;
      getTypeList();
    }
  };
</script>
<style lang="scss" scoped></style>
