<script lang="ts" setup>
import { useConfig } from './hooks/useConfig'
import { useProductForm } from './hooks/useForm'

// const { proxy } = getCurrentInstance()!
const { categoryList, groupList, initialConfig } = useConfig()
const customForm = ref<CustomerProps.CustomForm.FormRef>()
await initialConfig()
const _categoryList = categoryList.value.map((v: any) => {
  return {
    value: v.id,
    label: v.name
  }
})
const _groupList = groupList.value.map((v: any) => {
  return {
    value: v.id,
    label: v.name
  }
})
const ruleForm = useProductForm(_categoryList, _groupList)
</script>

<template>
  <div>
    <ElCard>
      <CustomForm
        v-bind="ruleForm"
        ref="customForm"
      />
    </ElCard>
  </div>
</template>
