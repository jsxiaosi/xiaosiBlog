<template>
  <div class="content">
    <el-row :gutter="20">
      <el-col :span="18" class="left">
        <!-- <el-col :span="18"> -->
        <el-card shadow="always" class="top_title">
          <div class="title">
            <el-input v-model="blogData.info.title" type="text" placeholder="博客标题"></el-input>
            <el-select v-model="blogData.info.type_id" class="m-2" placeholder="选择博客分类">
              <el-option
                v-for="item in typeList"
                :key="item.id"
                :label="item.typeName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </div>
        </el-card>
        <el-card shadow="always" class="blog-card">
          <div class="blog">
            <el-input
              v-model="blogData.info.article_content"
              class="input"
              type="textarea"
            ></el-input>
            <div class="marked" :innerHTML="html"> </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" class="right">
        <el-card shadow="always">
          <div class="push">
            <el-button @click="briefArticle()">暂存文章</el-button>
            <el-button type="primary" @click="handleArticle()">发布文章</el-button>
          </div>
          <div class="introduction">
            <img :src="fileData" />
            <!-- <el-input
              v-model="blogData.info.introduce"
              class="input"
              type="textarea"
              placeholder="文章介绍"
            ></el-input> -->
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { marked } from 'marked';
  import hljs from 'highlight.js';
  import 'highlight.js/styles/monokai-sublime.css';
  import { typeListApi } from '@/api/typeInfo';
  import { addArticleApi, articleInfoApi, updateArticleApi, uploadApi } from '@/api/blog';
  import {
    briefArticleInfoApi,
    addbriefArticleApi,
    updatebriefArticleApi,
    delbriefArticleApi,
  } from '@/api/briefArticle';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import { BlogModel } from '@/api/blog/blogModel';
  import { TypeInfoModel } from '@/api/typeInfo/typeInfoModel';

  const route = useRoute();
  const router = useRouter();

  const articleId = route.query.id;
  const pageType = route.query.type;

  const { createErrorMsg } = useMessage();

  onMounted(async () => {
    if (articleId) {
      const res =
        pageType === 'brief'
          ? await briefArticleInfoApi({ id: Number(articleId) })
          : await articleInfoApi({ id: Number(articleId) });
      if (res) blogData.info = res;
    }
  });

  marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    pedantic: false,
    sanitize: false,
    breaks: true,
    smartLists: true,
    smartypants: false,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    },
  });

  const html = computed(() => marked(blogData.info.article_content as string));

  const typeList = ref<TypeInfoModel[] | null>();

  const getTypeInfo = async () => {
    const res = await typeListApi();
    if (res) typeList.value = res;
  };

  getTypeInfo();

  const blogData = reactive<{ info: BlogModel }>({
    info: {
      // type_id: 0,
      // title: '',
      article_content: '# Marked in Node.js\n\nRendered by **marked**.',
      // introduce: '',
    },
  });

  // 发布文章按钮事件
  const handleArticle = async () => {
    const { info } = blogData;
    if (!info.title) {
      createErrorMsg('文章标题不可为空');
    } else if (!info.type_id) {
      createErrorMsg('文章类别不可为空');
    } else if (!info.article_content) {
      createErrorMsg('文章内容不可为空');
    } else {
      let optType = 'add';
      if (pageType === 'brief') {
        if (info.article_id) {
          info.id = info.article_id;
          optType = 'update';
        } else delete info.id;
        delete info.article_id;
      } else {
        if (articleId) optType = 'update';
      }
      addArticle(optType, info);
    }
  };

  // 文章添加修改
  const addArticle = async (type: string, info: BlogModel) => {
    const res = type === 'update' ? await updateArticleApi(info) : await addArticleApi(info);
    if (res) {
      if (pageType === 'brief') {
        const dlres = await delbriefArticleApi({ id: Number(articleId) });
        if (dlres) router.back();
      } else router.back();
    }
  };

  // 暂存文章添加与修改
  const briefArticle = async () => {
    let dataInfo: BlogModel = blogData.info;
    if (pageType !== 'brief' && dataInfo.id) {
      dataInfo.article_id = dataInfo.id;
      delete dataInfo.id;
      delete dataInfo.view_count;
      delete dataInfo.isTop;
      delete dataInfo.addTime;
    }
    const res =
      articleId && pageType === 'brief'
        ? await updatebriefArticleApi(dataInfo)
        : await addbriefArticleApi(dataInfo);
    if (res) {
      router.back();
    }
  };

  const fileData = ref();

  const upload = async (file: any) => {
    const forData = new FormData();
    forData.append('file', file);
    forData.append('id', new Date().getTime() + '');
    const res = await uploadApi(forData);
    console.log(res);
  };

  onMounted(() => {
    document.addEventListener('paste', async (event) => {
      let items = event.clipboardData && event.clipboardData.items;
      let file: File = {} as File;
      if (items && items.length) {
        // 检索剪切板items
        for (var i = 0; i < items.length; i++) {
          console.log(items[i].getAsFile());

          if (items[i].type.indexOf('image') !== -1) {
            file = items[i].getAsFile() as File;
            upload(file);
          }
        }
      }
    });
  });
</script>

<style lang="scss" scoped>
  .content {
    height: 100%;
    .el-row {
      height: 100%;
      .left {
        height: 100%;
        display: flex;
        flex-direction: column;
        .top_title {
          margin-bottom: 20px;
          .title {
            display: flex;
            .el-input {
              margin-right: 20px;
            }
          }
        }
        .blog-card {
          flex: 1;
          :deep(.el-card__body) {
            height: 100% !important;
          }
          .blog {
            height: 100%;
            display: flex;
            justify-content: space-between;
            .input {
              width: 49%;
              height: 100%;
              :deep(.el-textarea__inner) {
                height: 100% !important;
              }
            }
            .marked {
              width: 49%;
              height: 100%;
              padding: 0 20px;
              overflow-y: auto;
              border: 1px solid #{$text-color-placeholder};
            }
          }
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        height: 100%;
        .el-card {
          height: 100%;
        }
      }
    }
  }
</style>
