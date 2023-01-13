<script lang="ts" setup>
import { GetOrderDetail } from '@/apis/modules/order'
import { ElInput, FormInstance, ElSelect, ElOption } from 'element-plus'

const route = useRoute()
const customForm = ref<{ formRef: FormInstance }>()
const state = reactive({}) as Service.OrderDetailRes
const ruleForm = reactive({
  model: {
    name: '',
    city: ''
  },
  labelWidth: 70,
  hideRequiredAsterisk: false,
  rules: {
    name: [{ message: '请输入', required: true }],
    city: [{ message: '请输入', required: true, trigger: ['blur', 'change'] }]
  },
  formItems: [
    {
      component: markRaw(ElInput),
      label: '姓名',
      prop: 'name',
      placeholder: 'Please input',
      slots: {
        label (args: { label: string }): string {
          return args.label
        }
      }
    },
    {
      component: markRaw(ElSelect),
      label: '城市',
      prop: 'city',
      placeholder: 'Please select',
      style: {
        width: '100%'
      },
      option: {
        component: markRaw(ElOption),
        options: [
          {
            value: 0,
            label: '黄金糕'
          },
          {
            value: 1,
            label: '黄焖鸡米饭'
          }
        ]
      }
    }
  ]
})
watch(ruleForm, () => {
  console.log(ruleForm)
})
const r = await GetOrderDetail({ orderId: route.query.id as string })
Object.assign(state, r.data)
const valid = () => {
  if (!customForm.value) return
  customForm?.value?.formRef.validate()
}
</script>
<template>
  <div>
    {{ state.name }}
    <CustomForm v-bind="ruleForm" ref="customForm"></CustomForm>
    <ElButton @click="valid">validate</ElButton>
  </div>
</template>
