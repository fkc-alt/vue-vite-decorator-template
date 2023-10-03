<script lang="ts" setup>
import usePager from '@/hooks/usePager'
import { useConfig } from './hooks/useConfig'
import HTTPClient from '@/main'
import { spceColumn } from './config'

const router = useRouter()
const { categoryList, groupList, initialConfig } = useConfig()
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  name: '',
  categoryId: '',
  groupId: ''
})
const specList = ref<Service.Product.SpecListItem[]>([])

const tableProps = computed<
  CustomerProps.CustomTable.TableProps<Service.Product.SpecListItem>
>(() => {
  return {
    data: specList.value,
    column: spceColumn(),
    border: false,
    height: '600px',
    emptyText: '暂无数据'
  }
})

const handleAdd = () => {
  console.log('add')
}
const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await HTTPClient.productSpecController.list(Rest)
    pager.value.total = data.total || 0
    specList.value = data.item || []
  } catch (error) {
  } finally {
    loading.value = false
  }
}

initialConfig()
init()
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
