<script setup lang="ts">
  import { ElConfigProvider } from 'element-plus';
  import { deffElementLocale } from '@/hooks/web/useI18n';

  const { tolocale } = deffElementLocale();

  // import { deffHttp } from './utils/axios';
  // import HelloWorld from './components/HelloWorld.vue'

  // const admin = 'asdasdasdas'

  // This starter template is using Vue 3 experimental <script setup> SFCs
  // Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md

  // store.commit($mutation.SET_COLLAPSEMENU, locMenu)

  // const req = async () => {
  // 	const res = await deffHttp.post<void>({ url: '/mock_api/login',data:{username:'admin',password:'123123'} })
  // 	console.log(res)
  // }
  // const req2 = async () => {
  //   const res = await deffHttp.get<void>(
  //     {
  //       url: '/mock_api/getUserInfo',
  //     },
  //     {
  //       isShowData: true,
  //       urlPrefix: 'https://xiaosisi.com',
  //       specialToken: 'asdasdasdasd',
  //     },
  //   );
  //   console.log(res);
  // };
  // req2();
</script>

<template>
  <el-config-provider :locale="tolocale">
    <router-view />
  </el-config-provider>
</template>
