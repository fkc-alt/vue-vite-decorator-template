# TSX组件使用方式
```
// ../hooks/useForm文件
export default function (): CustomerProps.CustomForm.CustomFormProps {
  const ruleForm: CustomerProps.CustomForm.CustomFormProps = reactive({
    model: {
      name: '',
      city: '',
      flag: 0,
      checkbox: ['Option B'],
      switch: false,
      type: ['Option B']
    },
    labelWidth: 120,
    hideRequiredAsterisk: false,
    labelSuffix: 'suff',
    rules: {
      name: [{ message: '请输入用户名', required: true }],
      city: [{ message: '请选择城市', required: true, trigger: ['blur', 'change'] }],
      flag: [{ message: '请选择晚饭', required: true, trigger: ['blur', 'change'] }]
    },
    formItems: [
      {
        component: markRaw(ElInput),
        label: '姓名',
        prop: 'name',
        componentProps: {
          placeholder: 'Please input'
        },
        slots: {
          label (args) {
            return args.label + '#'
          }
        },
        events: {
          onInput (args) {
            console.log(args)
          }
        }
      },
      {
        component: markRaw(ElSelect),
        label: '城市',
        prop: 'city',
        componentProps: {
          placeholder: 'Please select',
          style: {
            width: '100%'
          }
        },
        slots: {
          label (args) {
            return args.label + '#'
          }
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
      },
      {
        component: markRaw(ElRadioGroup),
        label: '晚饭',
        prop: 'flag',
        componentProps: {
          size: 'small'
        },
        slots: {
          label (args) {
            return args.label + '#'
          }
        },
        option: {
          component: markRaw(ElRadio),
          options: [
            {
              value: '黄金糕',
              border: true,
              label: 0
            },
            {
              value: '黄焖鸡米饭',
              border: true,
              label: 1
            }
          ]
        }
      },
      {
        component: markRaw(ElCheckboxGroup),
        label: '多选框',
        prop: 'checkbox',
        slots: {
          label (args) {
            return args.label + '#'
          }
        },
        option: {
          component: markRaw(ElCheckbox),
          options: [
            {
              label: 'Option A'
            },
            {
              label: 'Option B'
            },
            {
              label: 'Option C'
            }
          ]
        }
      },
      {
        component: markRaw(ElSwitch),
        label: '开关',
        prop: 'switch',
        slots: {
          label (args) {
            return args.label + '#'
          }
        },
        events: {
          onInput (args) {
            console.log(args)
          }
        }
      },
      {
        component: markRaw(ElCheckboxGroup),
        label: '按钮组',
        prop: 'type',
        slots: {
          label (args) {
            return args.label + '#'
          }
        },
        events: {
          onChange (args) {
            console.log(args)
          }
        },
        option: {
          component: markRaw(ElCheckboxButton),
          options: [
            {
              label: 'Option A',
              name: 'type'
            },
            {
              label: 'Option B',
              name: 'type'
            },
            {
              label: 'Option C',
              name: 'type'
            }
          ]
        }
      }
    ]
  })
  return ruleForm
}
```
### React版本
```
import { OrderModuleFactory } from '@/service/modules/order/order.module'
import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'
import { ElButton } from 'element-plus'
import { ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch, ElCheckboxButton } from 'element-plus'

export default defineComponent({
  async setup () {
    const ruleForm = useForm()
    const route = useRoute()
    const customForm = ref<CustomerProps.CustomForm.FormRef>()
    const state = reactive({}) as Service.OrderDetailReq
    const r = await OrderModuleFactory.orderController.GetOrderDetail({ orderId: route.query.id as string })
    Object.assign(state, r.data)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const valid = async () => {
      try {
        await customForm.value?.formRef.validate()
      } catch (error) {
        console.log(error)
      }
    }
    return () => (
      <>
        <CustomForm {...ruleForm} ref={customForm} />
        <ElButton onClick={valid}>validate</ElButton>
      </>
    )
  }
})
```

### Vue3版本
```
<script lang="ts" setup>
import { OrderModuleFactory } from '@/service/modules/order/order.module'
import useForm from './hooks/useForm'
const route = useRoute()
const ruleForm = useForm()
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const state = reactive({}) as Service.OrderDetailRes
watch(ruleForm, () => {
  console.log(ruleForm)
})
const r = await OrderModuleFactory.orderController.GetOrderDetail({ orderId: route.query.id as string })
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
```