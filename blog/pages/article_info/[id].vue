<script setup lang="ts">
import timeFrom from '@/utils/timeFrom'
import { useDemoLeftBox } from '@/hook/close'

definePageMeta({
  layout: 'default',
})

const { closeLeftBox } = useDemoLeftBox()

const config = useRuntimeConfig()

const { marked, tocItems } = useMarked()

const html = ref('')
const route = useRoute()
const router = useRouter()

const info = ref()
let id = 0
if (!isNaN(Number(route.params.id)))
  id = Number(route.params.id)
const { data } = await useFetch<{
  data: any
}>(`${config.baseURL}/api/blog/article_info`, { params: { id }, key: `${id}` })
if (data) {
  info.value = data.value.data
  html.value = marked(info.value.article_content)

  useHead({
    titleTemplate: info.value.title,
    meta: [{ name: 'description', content: info.value.introduce }],
  })
}
</script>

<template>
  <div class="blog_content">
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
              <span>昵称：</span>
              <input placeholder="请输入昵称">
            </div>
            <div class="flex-x item">
              <span>联系方式：</span>
              <input placeholder="请输入联系方式">
            </div>
          </div>
          <textarea
            placeholder="评论、留言内容"
            placeholder-class="textarea-placeholder"
          />
          <div class="publish">
            <button class="pointer">
              发表
            </button>
          </div>
        </div>
        <div class="link" />
        <div class="comments_list">
          <h3>精选评论/留言</h3>
          <div
            v-for="(item, index) in 10"
            :key="index"
            class="flex-x comments_item"
          >
            <img src="@/assets/image/logo.png">
            <div class="comments_item_use">
              <div class="flex-y comments_item_use_info">
                <span class="name">匿名网友</span>
                <span class="time">2022-02-12 12:00</span>
              </div>
              <div class="comments_item_content">
                <span>我个人认为这个意大利面就应该拌42号混凝土，因为这个螺丝钉的长度它很容易会直接影响到挖掘机的扭矩，你知道吧，你往里砸的时候，一瞬间，它就会产生大量的高能蛋白，俗称UFO，会严重影响经济的发展，甚至对这个太平洋以及充电器都会造成一定的核、核、核污染，你知道吧，啊↑♂！再者说根据这个勾股定理，你可以很容易的推断出人工饲养的东条鹰寄，他是可以捕获野生的三角函数的，所以说这个这个这个这个，你不、不管秦始皇的切面是否具有放射性，呃特朗普的n次方是否含有沉淀物，都不影响这个这个沃尔玛跟这个维尔康在南极汇合</span>
              </div>
            </div>
          </div>
        </div>
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

.pointer {
  a:target {
    background-color: red;
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
      align-items: center;
    }
  }

  input {
    font-size: var(--font-size);
    line-height: 28px;
    flex: 1;
  }

  textarea {
    font-size: var(--font-size);
    margin: var(--margin-sm) 0;
    width: 100%;
    height: 70px;
  }

  .publish {
    width: 100%;
    display: flex;
    justify-content: flex-end;

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

    img {
      border-radius: 50%;
      width: 50px;
      height: 50px;
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
</style>
