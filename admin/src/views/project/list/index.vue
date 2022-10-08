<script lang="ts" setup>
  import { addProjectApi, deleteProjectApi, projectListApi, updateProjectApi } from '@/api/project';
  import { ProjectModel } from '@/api/project/projectModel';
  import { typeListApi } from '@/api/projectType';
  import { projectTypeModel } from '@/api/projectType/projectTypeModel';
  import Table from '@/components/Table/index.vue';
  import { ElMessageBox } from 'element-plus';
  import { reactive, ref } from 'vue';

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
      prop: 'sortName',
    },
    {
      label: '地址',
      prop: 'url',
    },
    {
      label: '项目描述',
      prop: 'introduce',
    },
    {
      label: '操作',
      prop: 'operate',
      isSlots: true,
      width: '160',
    },
  ];

  const typeList = ref<projectTypeModel[]>([]);
  const getTypeList = async () => {
    const res = await typeListApi();
    if (res) {
      typeList.value = res;
    }
  };

  getTypeList();

  const projectList = ref<ProjectModel[]>([]);

  const projectInfo = ref<ProjectModel>({} as ProjectModel);

  const getArticleList = async () => {
    const res = await projectListApi();
    projectList.value = res;
    attribute.data = res;
  };

  getArticleList();

  const attribute = reactive({
    data: projectList.value,
    border: true,
  });

  const delAft = async (info: ProjectModel) => {
    ElMessageBox.confirm(`是否确认删除 ’${info.title}‘ 项目`, '删除', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'error',
    })
      .then(async () => {
        const res = await deleteProjectApi(info.id);
        if (res) getArticleList();
      })
      .catch(() => {});
  };

  const dialogFormVisible = ref<boolean>(false);
  const addAft = () => {
    dialogFormVisible.value = true;
  };
  const updateType = async () => {
    let res;
    if (projectInfo.value.id) {
      delete projectInfo.value.sortName;
      res = await updateProjectApi(projectInfo.value);
    } else {
      res = await addProjectApi(projectInfo.value);
    }
    projectInfo.value = {} as ProjectModel;
    dialogFormVisible.value = false;
    if (res) {
      getArticleList();
    }
  };

  const updateAft = (e: ProjectModel) => {
    console.log(e);
    projectInfo.value = e;
    dialogFormVisible.value = true;
  };
</script>
<template>
  <div class="page-container">
    <el-button class="add" @click="addAft()">新建项目</el-button>

    <Table class="table" style="width: 100%" :attribute="attribute" :option="option">
      <template #operate="slotData">
        <div>
          <el-button @click="updateAft(slotData.row)">修改</el-button>
          <el-button @click="delAft(slotData.row)">删除</el-button>
        </div>
      </template>
    </Table>

    <el-dialog v-model="dialogFormVisible" :title="'新增项目'">
      <div class="dialog-content">
        <div class="dialog-content-item">
          <span>名称：</span>
          <el-input v-model="projectInfo.title" autocomplete="off" />
        </div>
        <div class="dialog-content-item">
          <span>分类：</span>
          <el-select v-model="projectInfo.sortId" class="m-2" placeholder="选择博客分类">
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            ></el-option>
          </el-select>
        </div>
        <div class="dialog-content-item">
          <span>简介：</span>
          <el-input v-model="projectInfo.introduce" autocomplete="off" />
        </div>
        <div class="dialog-content-item">
          <span>跳转地址：</span>
          <el-input v-model="projectInfo.url" autocomplete="off" />
        </div>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="updateType">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<style lang="scss" scoped>
  .dialog-content {
    .dialog-content-item {
      display: flex;
      flex-direction: column;
      margin-bottom: 20px;
    }
  }
</style>
