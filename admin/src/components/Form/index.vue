<script lang="ts" setup>
  import { onMounted, reactive, PropType, ref, watchEffect } from 'vue';
  import { FormProps, FormItemListProps } from './types/from';
  import FormItem from './src/components/FormItem.vue';

  const props = defineProps({
    formOption: {
      type: Object as PropType<FormProps>,
      default: () => {},
    },
    formValue: {
      type: Object,
      default: () => {},
    },
    rules: {
      type: Object,
      default: () => {},
    },
  });

  const emit = defineEmits<{
    (e: 'submitForm', form: FormItemListProps): void;
  }>();
  const form = reactive<any>(props.formValue || {});

  watchEffect(() => {
    if (props.formValue) {
      console.log('props.formValue', props.formValue);
      Object.keys(props.formValue).forEach((i) => {
        form[i] = props.formValue[i];
      });
    }
  });

  const formRef = ref();

  onMounted(() => {});

  function setFormModel(key: string, value: any) {
    form[key] = value;
  }

  const submitForm = () => {
    formRef.value.validate((value: any) => {
      console.log(value);
    });
    console.log(form);
    emit('submitForm', form);
  };

  const resetForm = () => {};

  defineExpose({
    form,
  });
</script>

<template>
  <div>
    <el-form
      ref="formRef"
      :rules="rules"
      :model="form"
      :label-position="formOption.labelPosition"
      label-width="120px"
    >
      <el-row v-for="(f, fix) in formOption.formItem" :key="fix" :gutter="f.gutter || 30">
        <el-col
          v-for="(fItem, fItemIx) in f.itemList"
          :key="fItemIx"
          :xs="f.xs || 24"
          :sm="f.sm || 24"
          :md="f.md || 12"
          :lg="f.lg || 8"
          :xl="f.xl || 8"
        >
          <FormItem :form-item="fItem" :form-model="form" :set-form-model="setFormModel">
            <template v-for="item in Object.keys($slots)" #[item]="data">
              <slot :name="item" v-bind="data || {}"></slot>
            </template>
          </FormItem>
        </el-col>
      </el-row>
      <el-form-item>
        <el-button type="primary" @click="submitForm()">Create</el-button>
        <el-button @click="resetForm()">Reset</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss"></style>
