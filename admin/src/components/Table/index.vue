<script lang="ts" setup>
  import { PropType } from 'vue';
  import TableChild from './src/components/TableChild.vue';
  const props = defineProps({
    attribute: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
    option: {
      type: Object as PropType<Recordable>,
      default: () => {},
    },
  });

  console.log(props.attribute);
</script>
<template>
  <div>
    <el-table v-bind="attribute" style="width: 100%">
      <TableChild v-for="(item, index) in option" :key="index" :item="item">
        <template v-for="soitem in Object.keys($slots)" #[soitem]="data">
          <slot :name="soitem" v-bind="data || {}"></slot>
        </template>
      </TableChild>
    </el-table>
  </div>
</template>
