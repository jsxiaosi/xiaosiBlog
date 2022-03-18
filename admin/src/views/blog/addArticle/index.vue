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
            <el-button>暂存文章</el-button>
            <el-button type="primary" @click="addArticle()">发布文章</el-button>
          </div>
          <div class="introduction">
            <el-input
              v-model="blogData.info.introduce"
              class="input"
              type="textarea"
              placeholder="文章介绍"
            ></el-input>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!--  -->
  </div>
</template>
<script lang="ts" setup>
  import { computed, onMounted, reactive, ref } from 'vue';
  import { marked } from 'marked';
  import { typeListApi } from '@/api/typeInfo';
  import { addArticleApi, articleInfoApi, updateArticleApi } from '@/api/blog';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useRoute, useRouter } from 'vue-router';
  import { BlogModel } from '@/api/blog/blogModel';
  import { TypeInfoModel } from '@/api/typeInfo/typeInfoModel';
  const route = useRoute();
  const router = useRouter();

  console.log(route.query.id);
  const articleId = route.query.id;

  const { createErrorMsg } = useMessage();

  onMounted(async () => {
    if (articleId) {
      const res = await articleInfoApi({ id: Number(articleId) });
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
      type_id: 0,
      title: '',
      article_content: '# Marked in Node.js\n\nRendered by **marked**.',
      introduce: '',
    },
  });

  const addArticle = async () => {
    const { info } = blogData;
    if (!info.title) {
      createErrorMsg('文章标题不可为空');
    } else if (!info.type_id) {
      createErrorMsg('文章类别不可为空');
    } else if (!info.article_content) {
      createErrorMsg('文章内容不可为空');
    } else {
      const res = articleId ? await updateArticleApi(info) : await addArticleApi(info);
      console.log(res);
      if (res) {
        router.back();
      }
    }
    // blogData.addTime = new Date(blogData.addTime).getTime() / 1000;
    // blogData.endTime = new Date(blogData.endTime).getTime() / 1000;
  };
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
              border: 1px solid #{$text-color-placeholder};
            }
          }
        }
      }
      .right {
        height: 100%;
        .el-card {
          height: 100%;
          .push,
          .introduction,
          .date {
            margin-bottom: 20px;
          }
          .date {
            display: flex;
          }
        }
      }
    }
  }
</style>
