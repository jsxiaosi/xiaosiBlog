<script setup lang="ts">
import { useUserInfoStore } from '@/store/userInfo'
const { userData } = useUserInfoStore()

const contactList = [
  {
    icon: 'icon-github',
    key: 'github',
  },
  {
    icon: 'icon-youxiang',
    key: 'email',
  },
  {
    icon: 'icon-weixin',
    key: 'wechat',
  },
  {
    icon: 'icon-qq',
    key: 'qq',
  },
]
</script>

<template>
  <div class="contact">
    <div v-for="item in contactList" :key="item.key" class="flex-y item">
      <i :class="[`icon iconfont ${item.icon}`]" />
      <span>{{ userData[item.key] || "保密" }}</span>
    </div>
  </div>
</template>

<style lang="scss">
.contact {
  max-width: 624px;
  height: 100%;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, 200px);
  grid-template-rows: 200px 200px;
  grid-column-gap: var(--margin);
  grid-row-gap: var(--margin);
  justify-content: center;

  .item {
    justify-content: center;
    align-items: center;
    border: 1px solid var(--border-color);
    padding: var(--padding-sm);
    border-radius: 5px;

    .icon {
      font-size: 38px;
      margin-bottom: var(--margin);
    }

    span {
      height: 40px;
      word-break: break-all;
    }
  }
}
</style>
