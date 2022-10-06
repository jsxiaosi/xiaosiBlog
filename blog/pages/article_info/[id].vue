<script setup lang="ts">
import { reactive } from 'vue'
import timeFrom from '@/utils/timeFrom'
import { useDemoLeftBox } from '@/hook/close'
import type { CommentModel } from '~~/types/blog'
import { useUserInfoStore } from '@/store/userInfo'

const { closeLeftBox, showLeftBox } = useDemoLeftBox()

const { userData } = useUserInfoStore()

const config = useRuntimeConfig()

const { marked, tocItems } = useMarked()

const html = ref('')
const route = useRoute()
const router = useRouter()

const info = ref()
const commentList = ref<CommentModel[]>()
let id = 0
if (!isNaN(Number(route.params.id)))
  id = Number(route.params.id)

const { data } = await useFetch<{
  data: any
}>(`${config.baseURL}/api/blog/article_info`, { params: { id }, key: `${id}` })
if (data) {
  commentList.value = data.value.data.comment
  info.value = data.value.data.blog
  html.value = marked(info.value.article_content)

  useHead({
    titleTemplate: info.value.title,
    meta: [{ name: 'description', content: info.value.introduce }],
  })
}

// 评论留言
const nicknameCheck = ref<boolean>(false)
const contentCheck = ref<boolean>(false)
const contactCheck = ref<boolean>(false)

const commentInfo = reactive<Partial<CommentModel>>({
  nickname: '',
  content: '',
  contact: '',
  blogId: id,
})

const showTost = ref<boolean>(false)
const loading = ref<boolean>(false)
const messageInfo = reactive({
  text: '',
  type: '',
})
const publishChange = async () => {
  if (loading.value)
    return

  const { nickname, contact, content } = commentInfo
  if (!nickname)
    nicknameCheck.value = true
  if (!contact)
    contactCheck.value = true
  if (!content)
    contentCheck.value = true

  if (nickname && contact && content) {
    loading.value = true

    const { data } = await useFetch<{
      data: any
      code: number
    }>(`${config.baseURL}/api/comment/add_comment`, {
      method: 'POST',
      body: commentInfo,
      key: `${new Date().getTime()}`,
    })
    if (data.value.code) {
      showTost.value = true
      messageInfo.text = '留言成功~！'
      messageInfo.type = 'success'
      commentInfo.nickname = ''
      commentInfo.content = ''
      commentInfo.contact = ''
    }
    else {
      messageInfo.text = '哎呀呀~！出错了'
      messageInfo.type = 'error'
    }
    loading.value = false
  }
}

const blurChage = (e, input_type: string) => {
  if (e.target.value) {
    switch (input_type) {
      case 'nicknameCheck':
        nicknameCheck.value = false
        break
      case 'contentCheck':
        contentCheck.value = false
        break
      case 'contactCheck':
        contactCheck.value = false
        break
    }
  }
}
</script>

<template>
  <div class="blog_content">
    <img class="head_image" :src="userData.avatar" @click="showLeftBox">
    <Message
      v-model:visible="showTost"
      :type="messageInfo.type"
      :text="messageInfo.text"
    />
    <div class="left-box">
      <div class="close" @click="closeLeftBox">
        X
      </div>
      <div class="container return">
        <div class="pointer" @click="router.back()">
          <i class="iconfont icon-fanhui" />
          <span>返回</span>
        </div>
      </div>
      <div class="container">
        <div class="article_title">
          <h3>{{ info.title }}</h3>
        </div>
      </div>
      <div class="container">
        <span class="title">文章信息：</span>
        <ul>
          <li>
            <span>分类：{{ info.typeName }}</span>
          </li>
          <li>
            <span>阅读量：{{ info.view_count }}</span>
          </li>
          <li>
            <span>创建时间：{{ info.addTime }}</span>
          </li>
          <li>
            <span>更新时间：{{
              timeFrom(info.update_time || info.addTime, false)
            }}</span>
          </li>
        </ul>
      </div>
      <div class="container">
        <span class="title">目录：</span>
        <ul>
          <li v-for="item in tocItems" :key="item.anchor" class="pointer">
            <a :href="`#${item.anchor}`">
              <i class="iconfont icon-wenjianjia icon" />
              <span>{{ item.text }}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="rigth-box">
      <div class="cart markdown" v-html="html" />
      <div class="cart">
        <div class="comments">
          <h3>评论/留言</h3>
          <div class="flex-x user_info">
            <div class="flex-x item">
              <span class="title"><i>*</i>昵称：</span>
              <div class="flex-y entry">
                <input
                  v-model="commentInfo.nickname"
                  :class="{ error_border: nicknameCheck }"
                  placeholder="请输入昵称"
                  @blur="(e) => blurChage(e, 'nicknameCheck')"
                >
                <span v-show="nicknameCheck" class="check_text">内容不可为空</span>
              </div>
            </div>
            <div class="flex-x item">
              <span class="title"><i>*</i>联系方式：</span>
              <div class="flex-y entry">
                <input
                  v-model="commentInfo.contact"
                  :class="{ error_border: contactCheck }"
                  placeholder="请输入联系方式"
                  @blur="(e) => blurChage(e, 'contactCheck')"
                >
                <span v-show="contactCheck" class="check_text">内容不可为空</span>
              </div>
            </div>
          </div>
          <div class="flex-y entry content">
            <textarea
              v-model="commentInfo.content"
              :class="{ error_border: contentCheck }"
              placeholder="评论、留言内容"
              placeholder-class="textarea-placeholder"
              @blur="(e) => blurChage(e, 'contentCheck')"
            />
            <span v-show="contentCheck" class="check_text">内容不可为空</span>
          </div>
          <div class="publish">
            <button class="flex-x pointer" @click="publishChange">
              <i v-show="loading" class="loading" />
              <span>发表</span>
            </button>
          </div>
        </div>
        <template v-if="commentList.length">
          <div class="link" />
          <div class="comments_list">
            <h3>精选评论/留言</h3>
            <div
              v-for="item in commentList"
              :key="item.id"
              class="flex-x comments_item"
            >
              <i class="icon iconfont icon-touxiang" />
              <div class="comments_item_use">
                <div class="flex-y comments_item_use_info">
                  <span class="name">匿名网友</span>
                  <span class="time">{{ timeFrom(item.dateTime, false) }}</span>
                </div>
                <div class="comments_item_content">
                  <span>{{ item.content }}</span>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.article_title {
  padding: 20px;
  border: 1px solid var(--border-color);
  padding: 25px 20px;
  background-color: var(--sub-color2);
  flex-wrap: 500;
  border-radius: 8px;

  h3 {
    margin: 0;
  }
}

.cart {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  padding: var(--padding);
  margin-bottom: var(--margin);
}

.return {
  font-size: var(--font-size);
  padding-top: 0;

  i {
    margin-right: var(--margin-sm);
  }
}

.comments {
  font-size: var(--font-size);

  h3 {
    margin-top: 0;
  }

  .user_info {
    align-items: center;
    justify-content: space-between;

    .item {
      width: 45%;

      // align-items: center;
      .title {
        line-height: 28px;

        i {
          color: var(--color-error);
          margin-right: 5px;
        }
      }
    }
  }

  .entry {
    flex: 1;

    input {
      font-size: var(--font-size);
      line-height: 28px;
    }

    .error_border {
      border: 1px solid var(--color-error);
    }

    .check_text {
      color: var(--color-error);
      font-size: var(--font-size-sm);
    }

    textarea {
      font-size: var(--font-size);
      width: 100%;
      height: 70px;
      min-width: 100%;
      max-width: 100%;
    }
  }

  .content {
    margin: var(--margin-sm) 0;
  }

  .publish {
    width: 100%;
    display: flex;
    justify-content: flex-end;

    .pointer {
      align-items: center;
      justify-content: center;

      a:target {
        background-color: red;
      }

      .loading {
        width: 10px;
        height: 10px;
        border: 1px solid #000;
        border-top-color: transparent;
        border-radius: 100%;
        margin-right: 5px;

        animation: circle infinite 0.75s linear;
      }

      // 转转转动画
      @keyframes circle {
        0% {
          transform: rotate(0);
        }

        100% {
          transform: rotate(360deg);
        }
      }
    }

    button {
      min-width: 80px;
      line-height: 28px;
    }
  }
}

.comments_list {
  font-size: var(--font-size);

  h3 {
    margin-top: 0;
  }

  .comments_item {
    margin-bottom: var(--margin);

    .icon {
      border-radius: 50%;
      font-size: 50px;
      // width: 50px;
      // height: 50px;
    }

    .comments_item_use {
      align-items: center;
      margin-left: var(--margin-sm);

      .comments_item_use_info {
        .name {
          color: var(--text-color);
        }

        .time {
          font-size: var(--font-size-sm);
        }

        span {
          line-height: 26px;
        }
      }
    }

    .comments_item_content {
      padding: var(--padding-sm) 0;
      border-bottom: 1px solid var(--border-color);
    }
  }
}

@media (max-width: 920px) {
  .comments {
    .user_info {
      display: flex;
      flex-direction: column;
      width: 100%;
      .item {
        width: 100%;
        .title {
          width: 90px;
          text-align: right;
        }
      }
      .item:nth-child(2) {
        margin-top: var(--margin-sm);
      }
    }
  }
}
</style>
