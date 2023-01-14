import { ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch } from 'element-plus'

export default function (): CustomerProps.CustomForm.CustomFormProps {
  const ruleForm: CustomerProps.CustomForm.CustomFormProps = reactive({
    model: {
      name: '',
      city: '',
      flag: 0,
      checkbox: [],
      switch: false
    },
    labelWidth: 70,
    hideRequiredAsterisk: false,
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
        placeholder: 'Please input',
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
        placeholder: 'Please select',
        style: {
          width: '100%'
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
        placeholder: 'Please select',
        style: {
          width: '100%'
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
        style: {
          width: '100%'
        },
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
      }
    ]
  })
  return ruleForm
}
