/* eslint-disable n/no-callback-literal */
/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/ban-types */
import { Plus } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import {
  ElIcon,
  ElInput,
  ElInputNumber,
  ElMessage,
  ElOption,
  ElSelect,
  ElUpload,
  UploadFile,
  UploadFiles
} from 'element-plus'
import { getToken } from '@/utils'
import { Enums } from '~@/typings/enums/product'

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
  ossBaseApi: string,
  isEdit: boolean,
  callback: Function
) {
  const { proxy } = getCurrentInstance()!
  const model = reactive({
    id: '',
    name: '',
    categoryId: '',
    groupId: '',
    description: '',
    sortValue: 1,
    carouselFileList: [] as any[],
    defailFileList: [] as any[],
    thumbnailFileList: [] as any[]
  })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onMounted(() => {
    const ElCarousel = document.querySelectorAll(
      '.carousel .el-upload-list'
    )[0] as HTMLElement
    const ElDefail = document.querySelectorAll(
      '.defail .el-upload-list'
    )[0] as HTMLElement
    const ElThumbnail = document.querySelectorAll(
      '.thumbnail .el-upload-list'
    )[0] as HTMLElement
    Sortable.create(ElCarousel, {
      onEnd: async ({ oldIndex, newIndex }: any) => {
        if (oldIndex !== newIndex) {
          // 交换位置
          const arr = model.carouselFileList
          const page = arr[oldIndex]
          if (isEdit) {
            await proxy?.HTTPClient.productController.updateProperties({
              id: page.id,
              sortValue: newIndex
            })!
          }
          arr.splice(oldIndex, 1)
          arr.splice(newIndex, 0, page)
          ElMessage.success('操作成功')
        }
      }
    })
    Sortable.create(ElDefail, {
      onEnd: async ({ oldIndex, newIndex }: any) => {
        if (oldIndex !== newIndex) {
          // 交换位置
          const arr = model.defailFileList
          const page = arr[oldIndex]
          if (isEdit) {
            await proxy?.HTTPClient.productController.updateProperties({
              id: page.id,
              sortValue: newIndex
            })!
          }
          arr.splice(oldIndex, 1)
          arr.splice(newIndex, 0, page)
          ElMessage.success('操作成功')
        }
      }
    })
    Sortable.create(ElThumbnail, {
      onEnd: async ({ oldIndex, newIndex }: any) => {
        if (oldIndex !== newIndex) {
          // 交换位置
          const arr = model.thumbnailFileList
          const page = arr[oldIndex]
          if (isEdit) {
            await proxy?.HTTPClient.productController.updateProperties({
              id: page.id,
              sortValue: newIndex
            })!
          }
          arr.splice(oldIndex, 1)
          arr.splice(newIndex, 0, page)
          arr[newIndex].isEditor = true
          ElMessage.success('操作成功')
        }
      }
    })
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
      sortValue: [{ message: '请输入排序值', required: true }],
      carouselFileList: [
        {
          validator(rule, value, callback, source, options) {
            if (!value.length) {
              return callback(new Error('请上传至少一个商品轮播图'))
            }
            return callback()
          },
          required: true
        }
      ],
      defailFileList: [
        {
          validator(rule, value, callback, source, options) {
            if (!value.length) {
              return callback(new Error('请上传至少一个商品详情图'))
            }
            return callback()
          },
          required: true
        }
      ],
      thumbnailFileList: [
        {
          validator(rule, value, callback, source, options) {
            if (!value.length) {
              return callback(new Error('请上传至少一个商品缩略图'))
            }
            return callback()
          },
          required: true
        }
      ]
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
          options: []
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
          options: []
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
      },
      {
        component: markRaw(ElUpload),
        label: '商品轮播图',
        prop: 'carouselFileList',
        componentProps: {
          class: 'carousel',
          autoUpload: true,
          fileList: model.carouselFileList,
          showFileList: true,
          data: {
            limitSize: 5,
            limitUnit: 'M'
          },
          headers: {
            'AUTHORIZATION-WITH-MALL': getToken()
          },
          action: ossBaseApi + '/v1/upload/image',
          listType: 'picture-card',
          ref: 'unref'
        },
        slots: {
          default: (...args): JSX.Element => {
            return (
              <ElIcon>
                <Plus />
              </ElIcon>
            )
          }
        },
        events: {
          onChange(file: UploadFile, fileList: UploadFile[]) {
            model.carouselFileList = fileList
          },
          onRemove: async (
            uploadFile: UploadFile,
            uploadFiles: UploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.delProperties({
                  id: (uploadFile as any).id
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([6, 'carouselFileList'])
              }
              return
            }
            ElMessage.success('操作成功')
          },
          onSuccess: async (
            response: Services.Common.Response<{ path: string }>,
            uploadFile,
            uploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.addProperties({
                  name: response.data.path,
                  productId: ruleForm.model.id,
                  value: response.data.path,
                  sortValue: model.carouselFileList.length
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([6, 'carouselFileList'])
              }
              return
            }
            model.carouselFileList[model.carouselFileList.length - 1].name =
              Enums.ImageType.CAROUSEL_IMAGE
            model.carouselFileList[model.carouselFileList.length - 1].value =
              response.data.path
            ElMessage.success('操作成功')
          }
        }
      },
      {
        component: markRaw(ElUpload),
        label: '商品缩略图',
        prop: 'thumbnailFileList',
        componentProps: {
          class: 'thumbnail',
          autoUpload: true,
          fileList: model.thumbnailFileList,
          showFileList: true,
          data: {
            limitSize: 5,
            limitUnit: 'M'
          },
          headers: {
            'AUTHORIZATION-WITH-MALL': getToken()
          },
          action: ossBaseApi + '/v1/upload/image',
          listType: 'picture-card',
          ref: 'uploadref'
        },
        slots: {
          default: (...args): JSX.Element => {
            return (
              <ElIcon>
                <Plus />
              </ElIcon>
            )
          }
        },
        events: {
          onChange(file: UploadFile, fileList: UploadFile[]) {
            model.thumbnailFileList = fileList
          },
          onRemove: async (
            uploadFile: UploadFile,
            uploadFiles: UploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.delProperties({
                  id: (uploadFile as any).id
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([6, 'thumbnailFileList'])
              }
              return
            }
            ElMessage.success('操作成功')
          },
          onSuccess: async (
            response: Services.Common.Response<{ path: string }>,
            uploadFile,
            uploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.addProperties({
                  name: '',
                  productId: ruleForm.model.id,
                  value: response.data.path,
                  sortValue: model.thumbnailFileList.length
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([6, 'thumbnailFileList'])
              }
              return
            }
            model.thumbnailFileList[model.thumbnailFileList.length - 1].name =
              Enums.ImageType.THUMBNAIL
            model.thumbnailFileList[model.thumbnailFileList.length - 1].value =
              response.data.path
            ElMessage.success('操作成功')
          }
        }
      },
      {
        component: markRaw(ElUpload),
        label: '商品详情图',
        prop: 'defailFileList',
        componentProps: {
          class: 'defail',
          autoUpload: true,
          fileList: model.defailFileList,
          showFileList: true,
          data: {
            limitSize: 5,
            limitUnit: 'M'
          },
          headers: {
            'AUTHORIZATION-WITH-MALL': getToken()
          },
          action: ossBaseApi + '/v1/upload/image',
          listType: 'picture-card',
          ref: 'uploadref'
        },
        slots: {
          default: (...args): JSX.Element => {
            return (
              <ElIcon>
                <Plus />
              </ElIcon>
            )
          }
        },
        events: {
          onChange(file: UploadFile, fileList: UploadFile[]) {
            model.defailFileList = fileList
          },
          onRemove: async (
            uploadFile: UploadFile,
            uploadFiles: UploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.delProperties({
                  id: (uploadFile as any).id
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([7, 'defailFileList'])
              }
              return
            }
            ElMessage.success('操作成功')
          },
          onSuccess: async (
            response: Services.Common.Response<{ path: string }>,
            uploadFile,
            uploadFiles
          ) => {
            if (isEdit) {
              try {
                await proxy?.HTTPClient.productController.addProperties({
                  name: '',
                  productId: ruleForm.model.id,
                  value: response.data.path,
                  sortValue: model.defailFileList.length
                })!
                ElMessage.success('操作成功')
              } catch (error) {
              } finally {
                callback([7, 'defailFileList'])
              }
              return
            }
            model.defailFileList[model.defailFileList.length - 1].name =
              Enums.ImageType.DETAIL_IMAGE
            model.defailFileList[model.defailFileList.length - 1].value =
              response.data.path
            ElMessage.success('操作成功')
          }
        }
      }
    ]
  })
  return { ruleForm }
}
