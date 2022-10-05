<script lang="ts" setup>
import { useUserInfoStore } from './store/userInfo'
import type { UserInfoModel } from './types/userInfo'
const config = useRuntimeConfig()

const store = useUserInfoStore()

const getUserInfo = async () => {
  const { data } = await useFetch<{
    userInfo: UserInfoModel
  }>(`${config.baseURL}/api/blog/userInfo`, { params: { id: '1' } })
  if (data.value) {
    const { userInfo } = data.value
    store.setUserInfo(userInfo)
  }
}

getUserInfo()
useColorMode()
</script>

<template>
  <NuxtLayout layout="default">
    <NuxtPage />
  </NuxtLayout>
</template>
