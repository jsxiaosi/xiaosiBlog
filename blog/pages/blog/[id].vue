<script setup lang="ts">
import { useDemoLeftBox } from '@/hook/close'
import timeFrom from '@/utils/timeFrom'
const { closeLeftBox } = useDemoLeftBox()
interface AccountType {
  name: string
  autograph: string
  qq: string
  email: string
  github: string
  githubName: string
  location: string
}

const route = useRoute()
const config = useRuntimeConfig()

let id = 0
if (!isNaN(Number(route.params.id)))
  id = Number(route.params.id)

const reslist = ref([])
const typeList = ref([])
const account = ref<AccountType>({
  name: '',
  autograph: '',
  qq: '',
  email: '',
  github: '',
  githubName: '',
  location: '',
})

const getBlogList = async () => {
  const { data } = await useFetch<{
    topList: any[]
    type: any[]
    list: any[]
  }>(`${config.baseURL}/api/blog/article_list`, { params: { id } })
  if (data.value) {
    const { topList, type, list } = data.value
    reslist.value = [...topList, ...list]
    typeList.value = type
  }
}

getBlogList()

const getUserInfo = async () => {
  const { data } = await useFetch<{
    userInfo: AccountType
  }>(`${config.baseURL}/api/blog/userInfo`, { params: { id: '1' } })
  if (data.value) {
    const { userInfo } = data.value
    account.value = userInfo
  }
}

getUserInfo()
</script>

<template>
  <div class="page">
    <div class="left-box">
      <div class="close" @click="closeLeftBox">
        X
      </div>
      <div class="container flex-y-center" style="padding-top: 0">
        <img class="image" src="@/assets/image/logo.png">
        <span class="name">{{ account.name }}</span>
        <span class="position">{{ account.autograph }}</span>
      </div>
      <!-- <div class="container">
        <span class="title">信息：</span>
        <ul>
          <li>QQ：{{ account.qq }}</li>
          <li>Email：{{ account.email }}</li>
          <li>
            仓库地址：
            <a :href="account.github" class="pointer">{{ account.githubName }}</a>
          </li>
          <li>现居住地：{{ account.location }}</li>
        </ul>
      </div> -->
      <div class="container">
        <span class="title">文章分类：</span>
        <ul>
          <li v-for="item in typeList" :key="item.id" class="pointer">
            <NuxtLink :to="`/${item.id}`">
              <i class="iconfont icon-wenjianjia icon" />
              <span>{{ item.typeName }}（{{ item.orderNum }}）</span>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </div>
    <div class="rigth-box">
      <div v-for="item in reslist" :key="item.id" class="cart">
        <NuxtLink :to="`/article_info/${item.id}`">
          <h3 class="pointer">
            {{ item.title }}
          </h3>
        </NuxtLink>
        <hr>
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
    margin-top: 15px;
    color: var(--text-color);
  }

  .position {
    margin-top: 10px;
    font-size: 16px;
    color: #555555;
  }
}

.cart {
  width: 100%;
  border: 1px solid var(--border-color);
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.12);
  padding: 30px;
  border: 1px solid var(--border-color);
  margin-bottom: 30px;

  h3 {
    margin: 0;
  }

  hr {
    margin: 15px 0 0 0;
    // border-color: var(--border-color);
    border: none;
    border-bottom: 1px solid var(--border-color);
    margin: 15px 0 0;
  }

  .introduce {
    margin: 15px 0;
    font-size: 14px;
  }

  .info {
    span {
      margin-right: 20px;
      font-size: 14px;
      color: var(--text-color2);
      // color: #999999;
    }
  }
}
</style>
