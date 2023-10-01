/* eslint-disable @typescript-eslint/ban-types */
import { ElInput, ElInputNumber, ElOption, ElSelect } from 'element-plus'

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
          type: 'textarea',
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
          type: 'textarea',
          placeholder: '请输入描述'
        }
      }
    ]
  })
  return ruleForm
}

export function useProductForm(
  cateGoryOptions: any[] = [],
  groupOptions: any[] = []
): CustomerProps.CustomForm.CustomFormProps {
  const model = reactive({
    name: '',
    categoryId: '',
    groupId: '',
    description: '',
    sortValue: 1,
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
    rules: {
      name: [{ message: '请输入商品名称', required: true }],
      categoryId: [
        {
          message: '请选择商品分类',
          required: true,
          trigger: ['blur', 'change']
        }
      ],
      groupId: [
        {
          message: '请选择商品分组',
          required: true,
          trigger: ['blur', 'change']
        }
      ],
      description: [{ message: '请输入商品描述', required: true }],
      sortValue: [{ message: '请输入排序值', required: true }]
    },
    formItems: [
      {
        component: markRaw(ElSelect),
        label: '商品分类',
        prop: 'categoryId',
        componentProps: {
          placeholder: '请选择商品分类',
          style: {
            width: '400px'
          }
        },
        option: {
          component: markRaw(ElOption),
          options: cateGoryOptions
        }
      },
      {
        component: markRaw(ElSelect),
        label: '商品分组',
        prop: 'groupId',
        componentProps: {
          placeholder: '请选择商品分组',
          style: {
            width: '400px'
          }
        },
        option: {
          component: markRaw(ElOption),
          options: groupOptions
        }
      },
      {
        component: markRaw(ElInput),
        label: '商品名称',
        prop: 'name',
        componentProps: {
          placeholder: '请输入商品名称',
          style: {
            width: '400px'
          }
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
        label: '商品描述',
        prop: 'description',
        componentProps: {
          placeholder: '请输入商品描述',
          type: 'textarea',
          style: {
            width: '400px'
          }
        }
      }
    ]
  })
  return ruleForm
}
