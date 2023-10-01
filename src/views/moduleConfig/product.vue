<script lang="ts" setup>
import usePager from '@/hooks/usePager'
import { modelCategoryDefault, useCategoryForm } from './hooks/useForm'
import { useConfig } from './hooks/useConfig'
import { productColumn } from './config'

const { proxy } = getCurrentInstance()!
const router = useRouter()
const ruleForm = useCategoryForm()
const { categoryList, groupList, initialConfig } = useConfig()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  name: '',
  categoryId: '',
  groupId: ''
})
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const type = ref<'add' | 'update'>('add')
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const [dialogVisible, delDialogVisible] = [ref(false), ref(false)]
const productList = ref<Service.Product.ProductListItem[]>([])
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
await initialConfig()
await init()
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
