<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import usePager from '@/hooks/usePager'
import { modelCategoryDefault, useCategoryForm } from './hooks/useForm'
import { productColumn } from './config'

const { proxy } = getCurrentInstance()!
const router = useRouter()
const ruleForm = useCategoryForm()
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const type = ref<'add' | 'update'>('add')
const btnLoading = ref(false)
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  name: '',
  categoryId: '',
  groupId: ''
})
const [dialogVisible, delDialogVisible] = [ref(false), ref(false)]
const productList = ref<Service.Product.ProductListItem[]>([])
const [categoryList, groupList] = [ref<any[]>([]), ref<any[]>([])]
const currentItem = ref<any>(null)
watch(
  () => dialogVisible.value,
  newVal => {
    if (!newVal) {
      Object.assign(ruleForm.model, modelCategoryDefault())
    } else {
      customForm.value?.formRef.clearValidate()
    }
  }
)
const tableProps = computed<
  CustomerProps.CustomTable.TableProps<Service.Product.ProductListItem>
>(() => {
  return {
    data: productList.value,
    column: productColumn({
      handleEdit: ({ row }, e: Event) => {
        e.preventDefault()
        type.value = 'update'
        Object.assign(ruleForm.model, row)
        dialogVisible.value = true
      },
      handleDel: ({ row }, e: any) => {
        e.preventDefault()
        currentItem.value = row
        delDialogVisible.value = true
      }
    }),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const handleAdd = () => {
  router.push({
    path: '/moduleConfig/productDetail',
    query: { type: 'add' }
  })
}

const afterFn = () => {
  ElMessage.success('操作成功')
  btnLoading.value = false
  dialogVisible.value = false
  delDialogVisible.value = false
  Object.assign(ruleForm.model, modelCategoryDefault())
  init()
}

const initConfig = async () => {
  loading.value = true
  try {
    const { data } = await proxy!.HTTPClient.productCateGoryController.list({
      currentPage: 1,
      pageSize: 999999
    })!
    categoryList.value = (data as any).item || []
  } catch (error) {}
  try {
    const { data } = await proxy!.HTTPClient.productGroupController.list({
      currentPage: 1,
      pageSize: 999999
    })!
    groupList.value = (data as any).item || []
  } catch (error) {}
  loading.value = false
  await init()
}

const handleSubmit = () => {
  customForm.value?.formRef.validate(async valid => {
    if (valid) {
      btnLoading.value = true
      const {
        model: { id, name, msg, sortValue }
      } = ruleForm as any
      const ReqJson: any = { name, msg, sortValue }
      if (type.value === 'update') {
        Object.assign(ReqJson, { id })
        await proxy?.HTTPClient.productCateGoryController.update(ReqJson)
        afterFn()
        return
      }
      await proxy?.HTTPClient.productCateGoryController.add(ReqJson)
      afterFn()
    }
  })
}
const handleSubmitDel = async () => {
  btnLoading.value = true
  const { id } = currentItem.value
  await await proxy?.HTTPClient.productCateGoryController.del({ id })
  afterFn()
}
const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await proxy!.HTTPClient.productController.list(Rest)!
    pager.value.total = data.total || 0
    productList.value = data.item || []
  } catch (error) {
  } finally {
    loading.value = false
  }
}
initConfig()
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <ElInput
            v-model="pager.name"
            placeholder="请输入商品名称"
          />
          <ElSelect
            v-model="pager.categoryId"
            clearable
            placeholder="请选择分类"
          >
            <ElOption
              v-for="category in categoryList"
              :key="category.id"
              :value="category.id"
              :label="category.name"
            />
          </ElSelect>
          <ElSelect
            v-model="pager.groupId"
            clearable
            placeholder="请选择分类"
          >
            <ElOption
              v-for="group in groupList"
              :key="group.id"
              :value="group.id"
              :label="group.name"
            />
          </ElSelect>

          <el-button
            type="primary"
            icon="Search"
            @click="init"
            >查询</el-button
          >
          <el-button
            type="primary"
            icon="Plus"
            @click="handleAdd"
            >添加商品</el-button
          >
        </div>
      </template>
      <CustomTable
        ref="refTable"
        v-bind="tableProps"
        v-loading="loading"
      />
      <ElPagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        :page-size="pager.pageSize"
        :current-page="pager.currentPage"
        @current-change="$event => handlePageChange($event, init)"
        @size-change="$event => handleSizeChange($event, init)"
      />
    </ElCard>
    <ElDialog
      v-model="dialogVisible"
      :title="type === 'add' ? '添加分类' : '编辑分类'"
      width="70%"
    >
      <CustomForm
        v-bind="ruleForm"
        ref="customForm"
      />
      <div class="btn-group">
        <ElButton
          type="primary"
          :loading="btnLoading"
          @click="handleSubmit"
          >确 定</ElButton
        >
        <ElButton @click="dialogVisible = false">取 消</ElButton>
      </div>
    </ElDialog>
    <ElDialog
      v-model="delDialogVisible"
      title="删除分类"
      width="70%"
    >
      <div>您是否删除当前分类？</div>
      <div class="btn-group">
        <ElButton
          type="primary"
          :loading="btnLoading"
          @click="handleSubmitDel"
          >确 定</ElButton
        >
        <ElButton @click="delDialogVisible = false">取 消</ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
  .el-button {
    margin-left: 0;
  }
}
.btn-group {
  text-align: right;
}
</style>
