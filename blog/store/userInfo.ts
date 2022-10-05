import { defineStore } from 'pinia'
import type { UserInfoModel } from '~~/types/userInfo'

export const useUserInfoStore = defineStore('userInfo', () => {
  const userInfo = ref<UserInfoModel>({} as UserInfoModel)

  const userData = computed(() => userInfo.value)

  function setUserInfo(value: UserInfoModel) {
    userInfo.value = value
  }

  return {
    userInfo,
    userData,
    setUserInfo,
  }
})
