<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import HTTPClient from '@/main'
import { useConfig, mapValues } from './hooks/useConfig'
import { useProductForm } from './hooks/useForm'
import { imageTypeRelationKeys } from './config'

type KeyTuple = [
  5 | 6 | 7,
  'carouselFileList' | 'defailFileList' | 'thumbnailFileList'
]

const { categoryList, groupList, initialConfig } = useConfig()
const [route, router] = [useRoute(), useRouter()]
const isEdit = computed(() => !!route.query.id)
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const { ruleForm } = useProductForm(
  import.meta.env.VITE_APP_BASE_OSS_API,
  isEdit.value,
  (keyTuple: KeyTuple) => getProductProperties(keyTuple)
)

watch(
  () => isEdit.value,
  async newVal => {
    if (newVal) {
      const { data } = await HTTPClient.productController.detail({
        id: +route.query.id!
      })
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { updateAt, createAt, ...Rest } = data
      Object.assign(ruleForm.model, { ...Rest })
      getProductProperties()
    }
  },
  { immediate: true }
)

const getProductProperties = async (
  keyTuple?: [
    5 | 6 | 7,
    'carouselFileList' | 'defailFileList' | 'thumbnailFileList'
  ]
) => {
  const { data: properties } =
    await HTTPClient.productController.propertiesList({
      productId: +route.query.id!
    })
  const _properties = Object.fromEntries(
    Object.entries(properties).map(([propertieKey, propertieValue]) => {
      return [
        imageTypeRelationKeys[propertieKey],
        propertieValue.map(mapProperties)
      ]
    })
  )
  if (keyTuple) {
    ruleForm.model[keyTuple[0]] = _properties[keyTuple[1]]
    ;(ruleForm.formItems[keyTuple[0]].componentProps as any).fileList =
      _properties[keyTuple[1]]
  } else {
    Object.assign(ruleForm.model, _properties)
    ;(ruleForm.formItems[5].componentProps as any).fileList =
      _properties.carouselFileList
    ;(ruleForm.formItems[6].componentProps as any).fileList =
      _properties.thumbnailFileList
    ;(ruleForm.formItems[7].componentProps as any).fileList =
      _properties.defailFileList
  }

  console.log('_properties', _properties)
}

const mapProperties = (v: any, sortValue: number) => ({
  id: v.id,
  name: v.name,
  value: v.value,
  sortValue,
  url: import.meta.env.VITE_APP_BASE_OSS_URL + v.value
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
            ...carouselFileList
              .map(mapProperties)
              .map(({ id, ...Rest }: any) => Rest),
            ...defailFileList
              .map(mapProperties)
              .map(({ id, ...Rest }: any) => Rest),
            ...thumbnailFileList
              .map(mapProperties)
              .map(({ id, ...Rest }: any) => Rest)
          ]
        })
        await HTTPClient.productController.add(ReqJson as any)
      } else {
        await HTTPClient.productController.update(ReqJson as any)
      }
      ElMessage.success('操作成功')
      onCancel()
    }
  })
}
watch(
  () => categoryList.value,
  newVal => {
    ruleForm.formItems[0].option!.options = newVal.map(mapValues)
  }
)
watch(
  () => groupList.value,
  newVal => {
    ruleForm.formItems[1].option!.options = newVal.map(mapValues)
  }
)
initialConfig()
</script>

<template>
  <div>
    <ElCard>
      <CustomForm
        v-bind="ruleForm"
        ref="customForm"
      />
      <ElButton @click="onCancel">返 回</ElButton>
      <ElButton
        type="primary"
        @click="onSubmit"
        >确 定</ElButton
      >
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
