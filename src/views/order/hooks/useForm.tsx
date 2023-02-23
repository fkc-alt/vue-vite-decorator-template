import { Plus } from '@element-plus/icons-vue'
import { ElInput, ElSelect, ElOption, ElRadioGroup, ElRadio, ElCheckboxGroup, ElCheckbox, ElSwitch, ElCheckboxButton, ElUpload, UploadFile, ElIcon } from 'element-plus'

export default function (): CustomerProps.CustomForm.CustomFormProps {
  const model = reactive({
    name: '',
    city: '',
    flag: 0,
    checkbox: ['Option B'],
    switch: false,
    type: ['Option B'],
    fileList: [] as any[]
  })
  const ruleForm: CustomerProps.CustomForm.CustomFormProps = reactive({
    model,
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
      },
      {
        component: markRaw(ElUpload),
        prop: 'fileList',
        componentProps: {
          autoUpload: false,
          fileList: model.fileList,
          showFileList: true,
          listType: 'picture-card',
          ref: 'uploadref'
        },
        slots: {
          default: (...args): JSX.Element => {
            return (<ElIcon><Plus /></ElIcon>)
          },
          file ({ file }): JSX.Element {
            return (<img src={file.url} />)
          }
        },
        events: {
          onChange (file: UploadFile, fileList: UploadFile[]) {
            model.fileList = fileList
          }
        }
      }
    ]
  })
  return ruleForm
}
