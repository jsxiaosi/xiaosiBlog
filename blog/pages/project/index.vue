<script setup lang="ts">
import type { ProjectList, ProjectModel } from '~~/types/project'

const config = useRuntimeConfig()

const projectList = ref<ProjectList[]>([])

const getBlogList = async () => {
  const { data } = await useFetch<{
    data: ProjectModel[]
  }>(() => `${config.baseURL}/api/project/list`)
  if (data.value) {
    const list = data.value.data
    const newList: ProjectList[] = []
    list.forEach((item) => {
      const index = newList.findIndex(i => i.sortId === item.sortId)
      if (index === -1) {
        newList.push({
          sortId: item.sortId,
          sortName: item.sortName,
          child: [item],
        })
      }
      else {
        newList[index].child.push(item)
      }
    })
    projectList.value = newList
  }
}

getBlogList()
</script>

<template>
  <div class="project">
    <div v-for="i in projectList" :key="i.sortId">
      <h3>{{ i.sortName }}</h3>
      <div class="content">
        <NuxtLink
          v-for="childItem in i.child"
          :key="childItem.id"
          :to="childItem.url"
          target="_blank"
          class="flex-y item pointer"
        >
          <span class="title">{{ childItem.title }}</span>
          <span class="text">{{ childItem.introduce }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
.project {
  max-width: 626px;
  height: 100%;
  margin: auto;
  border: 1px solid transparent;

  .content {
    display: grid;
    grid-template-columns: repeat(auto-fit, 300px);
    grid-template-rows: repeat(auto-fit, 100px);
    grid-column-gap: var(--margin);
    grid-row-gap: var(--margin);
    justify-content: space-between;

    .item {
      // justify-content: center;
      align-items: flex-start;
      padding: var(--padding-sm);
      border-radius: 5px;
      transition: 0.5s;

      .title {
        line-height: 26px;
        font-weight: 500;
        font-size: 18px;
      }

      .text {
        font-size: var(--font-size);
        color: var(--text-color2);
      }
    }

    .item:hover {
      box-shadow: var(--box-shadow);
    }
  }
}
</style>
