<script setup lang="ts">
import { useDemoLeftBox } from '@/hook/close'
import timeFrom from '@/utils/timeFrom'
import { useUserInfoStore } from '@/store/userInfo'

const { userData } = useUserInfoStore()

const { closeLeftBox, showLeftBox } = useDemoLeftBox()

const route = useRoute()
const config = useRuntimeConfig()

let id = 0
if (!isNaN(Number(route.params.id)))
  id = Number(route.params.id)

const reslist = ref([])
const typeList = ref([])

const getBlogList = async () => {
  const { data } = await useFetch<{
    topList: any[]
    type: any[]
    list: any[]
  }>(() => `${config.baseURL}/api/blog/article_list`, {
    params: { id },
    key: `${id}`,
  })
  if (data.value) {
    const { topList, type, list } = data.value
    reslist.value = [...topList, ...list]
    typeList.value = type
  }
}

getBlogList()
</script>

<template>
  <div class="blog_content">
    <img class="head_image" :src="userData.avatar" @click="showLeftBox">
    <div class="left-box">
      <div class="close" @click="closeLeftBox">
        X
      </div>
      <div class="container flex-y-center" style="padding-top: 0">
        <img class="image" :src="userData.avatar">
        <span class="name">{{ userData.name }}</span>
        <span class="position">{{ userData.autograph }}</span>
      </div>
      <div class="container">
        <span class="title">文章分类：</span>
        <ul>
          <li class="pointer">
            <NuxtLink to="/blog">
              <i class="iconfont icon-wenjianjia icon" />
              <span>全部</span>
            </NuxtLink>
          </li>
          <li v-for="item in typeList" :key="item.id" class="pointer">
            <NuxtLink :to="`/blog/${item.id}`">
              <i class="iconfont icon-wenjianjia icon" />
              <span>{{ item.typeName }}（{{ item.orderNum }}）</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="rigth-box">
      <div v-for="item in reslist" :key="item.id">
        <hr>
        <div class="cart">
          <h3>
            {{ item.title }}
          </h3>
          <div class="introduce">
            {{ item.introduce }}
          </div>
          <div class="info flex-x">
            <span>创建时间：{{ item.addTime }}</span>
            <span>更新时间：{{
              timeFrom(item.update_time || item.addTime, false)
            }}</span>
            <span>分类：{{ item.typeName }}</span>
            <span>阅读量：{{ item.view_count }}</span>
          </div>
          <NuxtLink :to="`/article_info/${item.id}`" class="full">
            <span class="full-text pointer">阅读全文</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  .image {
    width: 100px;
    height: 100px;
    background-color: var(--sub-color);
    border-radius: 50%;
    // height: 100vw;
  }

  .name {
    font-size: 22px;
    margin-top: var(--margin-sm);
    color: var(--text-color);
  }

  .position {
    margin-top: var(--margin-sm);
    font-size: var(--font-size-lg);
    color: #555555;
  }
}

.cart:hover {
  box-shadow: 0 0px 10px rgba(0, 0, 0, 0.12);
}

hr {
  width: 60px;
  margin: 0 0 0 var(--margin);
  border: none;
  border-bottom: 3px solid var(--border-color);
}

.cart {
  width: 100%;
  padding: var(--padding);
  transition: 0.5s;

  h3 {
    margin: 0;
    font-size: 20px;
  }

  .introduce {
    margin: var(--margin-sm) 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    /*设置方向*/
    -webkit-line-clamp: 3;
    /*设置超过为省略号的行数*/
    overflow: hidden;
  }

  .info {
    span {
      margin-right: var(--margin);
      font-size: var(--font-size);
      color: var(--text-color2);
      // color: #999999;
    }

    margin-bottom: var(--margin);
  }

  .full-text {
    color: var(--color-primary);
  }
}

@media (max-width: 920px) {
  .cart {
    padding: var(--padding-sm) 0;
    .info {
      span {
        flex: 1;
      }
    }
  }
  hr {
    margin: 0;
  }
}
</style>
