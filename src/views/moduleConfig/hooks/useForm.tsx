/* eslint-disable @typescript-eslint/ban-types */
import { ElInput, ElInputNumber } from 'element-plus'

export const modelCategoryDefault = () => {
  return {
    name: '',
    sortValue: 0,
    msg: ''
  }
}

export const modelGroupDefault = () => {
  return {
    name: '',
    sortValue: 0,
    description: ''
  }
}

export function useCategoryForm(): CustomerProps.CustomForm.CustomFormProps {
  const model = reactive(modelCategoryDefault())
  const ruleForm: CustomerProps.CustomForm.CustomFormProps = reactive({
    model,
    labelWidth: 90,
    hideRequiredAsterisk: false,
    labelPosition: 'right',
    rules: {
      name: [{ message: '请输入分类名称', required: true }],
      sortValue: [{ message: '请输入排序值', required: true }]
    },
    formItems: [
      {
        component: markRaw(ElInput),
        label: '分类名称',
        prop: 'name',
        componentProps: {
          placeholder: '请输入分类名称'
        },
        events: {
          onInput(val: string) {
            model.name = val.trim()
          }
        }
      },
      {
        component: markRaw(ElInputNumber),
        label: '排序值',
        prop: 'sortValue',
        componentProps: {
          placeholder: '请输入排序值',
          min: 1,
          controlsPosition: 'right',
          style: {
            width: '200px'
          }
        }
      },
      {
        component: markRaw(ElInput),
        label: '分类描述',
        prop: 'msg',
        componentProps: {
          placeholder: '请输入描述'
        }
      }
    ]
  })
  return ruleForm
}

export function useGroupForm(): CustomerProps.CustomForm.CustomFormProps {
  const model = reactive(modelGroupDefault())
  const ruleForm: CustomerProps.CustomForm.CustomFormProps = reactive({
    model,
    labelWidth: 90,
    hideRequiredAsterisk: false,
    labelPosition: 'right',
    rules: {
      name: [{ message: '请输入分组名称', required: true }],
      sortValue: [{ message: '请输入排序值', required: true }]
    },
    formItems: [
      {
        component: markRaw(ElInput),
        label: '分组名称',
        prop: 'name',
        componentProps: {
          placeholder: '请输入分组名称'
        },
        events: {
          onInput(val: string) {
            model.name = val.trim()
          }
        }
      },
      {
        component: markRaw(ElInputNumber),
        label: '排序值',
        prop: 'sortValue',
        componentProps: {
          placeholder: '请输入排序值',
          min: 1,
          controlsPosition: 'right',
          style: {
            width: '200px'
          }
        }
      },
      {
        component: markRaw(ElInput),
        label: '分组描述',
        prop: 'msg',
        componentProps: {
          placeholder: '请输入描述'
        }
      }
    ]
  })
  return ruleForm
}
