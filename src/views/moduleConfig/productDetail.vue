<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import { useConfig, mapValues } from './hooks/useConfig'
import { useProductForm } from './hooks/useForm'

const { proxy } = getCurrentInstance()!
const { categoryList, groupList, initialConfig } = useConfig()
const [route, router] = [useRoute(), useRouter()]
const isEdit = computed(() => !!route.query.id)
const customForm = ref<CustomerProps.CustomForm.FormRef>()
await initialConfig()
const ruleForm = useProductForm(
  import.meta.env.VITE_APP_BASE_OSS_API,
  categoryList.value.map(mapValues),
  groupList.value.map(mapValues)
)
watch(
  () => isEdit.value,
  async newVal => {
    if (newVal) {
      const { data } = await proxy?.HTTPClient.productController.detail({
        id: +route.query.id!
      })!
      const { data: properties } =
        await proxy?.HTTPClient.productController.propertiesList({
          productId: +route.query.id!
        })!
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updateAt, createAt, ...Rest } = data
      Object.assign(ruleForm.model, Rest)
      console.log(properties, 'properties')
    }
  },
  { immediate: true }
)
const mapProperties = (v: any, sortValue: number) => ({
  name: v.name,
  value: v.value,
  sortValue
})

const onCancel = () => {
  router.back()
}
const onSubmit = () => {
  customForm.value?.formRef.validate(async valid => {
    if (valid) {
      const { carouselFileList, defailFileList, thumbnailFileList, ...Rest } =
        ruleForm.model
      const ReqJson = { ...Rest }
      if (!isEdit.value) {
        Object.assign(ReqJson, {
          properties: [
            ...carouselFileList.map(mapProperties),
            ...defailFileList.map(mapProperties),
            ...thumbnailFileList.map(mapProperties)
          ]
        })
        await proxy?.HTTPClient.productController.add(ReqJson as any)!
      } else {
        await proxy?.HTTPClient.productController.update(ReqJson as any)!
      }
      ElMessage.success('操作成功')
      onCancel()
    }
  })
}
</script>

<template>
  <div>
    <ElCard>
      <CustomForm
        v-bind="ruleForm"
        ref="customForm"
      />
      <ElButton @click="onCancel">返 回</ElButton>
      <ElButton @click="onSubmit">确 定</ElButton>
    </ElCard>
  </div>
</template>
<style lang="scss" scoped>
:deep(.el-upload-list__item-preview) {
  display: none !important;
}
:deep(.el-upload-list--picture-card .el-upload-list__item-actions span + span) {
  margin-left: 0 !important;
}
:deep(.el-upload-list__item-status-label) {
  display: none !important;
}
</style>
