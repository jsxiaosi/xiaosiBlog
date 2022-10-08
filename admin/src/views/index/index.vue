<script setup lang="ts">
  import { computed, onMounted, reactive, ref } from 'vue';
  import { useMarked } from '@/hooks/useMarked';
  import Form from '@/components/Form/index.vue';
  import { FormProps } from '@/components/Form/types/from';
  import { getUserInfoApi, updateUserInfoApi } from '@/api/userInfo';
  import { UploadFile } from 'element-plus';
  import { uploadApi } from '@/api/blog';
  import { beforeAvatarUpload } from '@/utils/file';
  import { httpsUrl } from '@/utils/axios';
  import { UserInfoModel } from '@/api/userInfo/userInfoModel';

  const { marked } = useMarked();

  const describe = ref<string>('');

  const html = computed(() => marked(describe.value || ''));

  const formOption = reactive<FormProps>({
    labelPosition: 'right',
    formItem: [
      {
        gutter: 30,
        md: 24,
        lg: 24,
        xl: 24,
        itemList: [
          {
            component: 'ElInput',
            label: '头像',
            prop: 'avatar',
            props: {
              type: 'textarea',
            },
          },
        ],
      },
      {
        gutter: 30,
        itemList: [
          {
            component: 'ElInput',
            label: '名称',
            prop: 'name',
          },
          {
            component: 'ElInput',
            label: '所在城市',
            prop: 'location',
          },
          {
            component: 'ElInput',
            label: '邮箱',
            prop: 'email',
          },
          {
            component: 'ElInput',
            label: 'QQ',
            prop: 'qq',
          },
          {
            component: 'ElInput',
            label: '微信',
            prop: 'wechat',
          },
          {
            component: 'ElInput',
            label: 'github',
            prop: 'github',
          },
          {
            component: 'ElInput',
            label: 'github名称',
            prop: 'githubName',
          },
        ],
      },
      {
        gutter: 30,
        md: 24,
        lg: 24,
        xl: 24,
        itemList: [
          {
            component: 'ElInput',
            label: '简介',
            prop: 'autograph',
            props: {
              type: 'textarea',
            },
          },
        ],
      },
      {
        gutter: 30,
        md: 24,
        lg: 24,
        xl: 24,
        itemList: [
          {
            component: 'ElInput',
            label: '个人描述',
            prop: 'describe',
            props: {
              type: 'textarea',
            },
          },
        ],
      },
    ],
  });

  const submitForm = async (value: any) => {
    const res = await updateUserInfoApi({ ...from.value, ...value, describeText: describe.value });
    console.log('res', res);
  };

  const from = ref<UserInfoModel>({} as UserInfoModel);

  const getUserInfo = async () => {
    const res = await getUserInfoApi();
    from.value = res.data.userInfo;
    describe.value = from.value.describeText;
  };

  const handleUpload = async (uploadFile: UploadFile) => {
    console.log(uploadFile);
    const forData = new FormData();
    const file = uploadFile.raw as File;
    const fileData = new File([await beforeAvatarUpload(file)], `user_${file.name}`, {
      type: file.type,
      lastModified: Date.now(),
    });
    forData.append('file', fileData);
    forData.append('id', new Date().getTime() + '');
    forData.append('filePath', 'userInfo');

    const res = await uploadApi(forData);
    console.log(res);
    if (res) {
      console.log(res);
      from.value.avatar = encodeURI(`${httpsUrl}/image/${res.fileName}`);
    }
  };

  onMounted(() => {
    getUserInfo();
  });
</script>
<template>
  <div class="page-container">
    <Form ref="formRef" :form-option="formOption" :form-value="from" @submit-form="submitForm">
      <template #avatar>
        <el-upload
          class="avatar-uploader"
          :show-file-list="false"
          :on-change="handleUpload"
          :auto-upload="false"
        >
          <img v-if="from.avatar" :src="from.avatar" class="avatar" />
          <el-icon v-else class="avatar-uploader-icon"><iEL-plus /></el-icon>
        </el-upload>
      </template>
      <template #describe>
        <div class="blog">
          <el-input v-model="describe" class="input" type="textarea"></el-input>
          <div class="marked" :innerHTML="html"></div>
        </div>
      </template>
    </Form>
  </div>
</template>
<style lang="scss" scoped>
  .page-container {
    height: auto;
  }
  .avatar-uploader {
    margin-bottom: 20px;
  }
  .avatar-uploader .avatar {
    width: 150px;
    height: 150px;
    display: block;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }

  .avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
  }

  .el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    text-align: center;
  }

  .blog {
    width: 100%;
    height: 500px;
    display: flex;
    justify-content: space-between;
    .input {
      width: 49%;
      height: 100%;
    }
    .input:deep(.el-textarea__inner) {
      height: 500px;
      max-height: 100%;
    }
    .marked {
      width: 49%;
      height: 100%;
      padding: 5px 11px;
      overflow-y: auto;
      border: 1px solid #{$text-color-placeholder};
    }
  }
</style>
