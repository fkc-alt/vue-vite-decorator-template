<script lang="ts" setup>
import ServiceModule from '@/apis'
import useForm from './hooks/useForm'
const route = useRoute()
const ruleForm = useForm()
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const state = reactive({}) as Service.OrderDetailRes
watch(ruleForm, () => {
  console.log(ruleForm)
})
const r = await ServiceModule.OrderController.GetOrderDetail({ orderId: route.query.id as string })
Object.assign(state, r.data)
const valid = async () => {
  try {
    await customForm.value?.formRef.validate()
  } catch (error) {
    console.log(error)
  }
}
</script>
<template>
  <div>
    {{ state.name }}
    <CustomForm v-bind="ruleForm" ref="customForm"></CustomForm>
    <ElButton @click="valid">validate</ElButton>
  </div>
</template>
