<script lang="ts" setup>
import usePager from '@/hooks/usePager'
import { productColumn } from './config'

const { proxy } = getCurrentInstance()!
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager()
const productList = ref<any[]>([])

const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: productList.value,
    column: productColumn(),
    border: false,
    height: '600px',
    onSelectionChange(rows: Service.IndexConfig.QuerySwiperConfigRes) {
      console.log(rows)
    }
  }
})

const handleAdd = () => {
  console.log('add')
}
const handleDelete = () => {
  console.log('delete')
}
const Delete = () => {
  console.log('delete')
}
const init = async () => {
  loading.value = true
  proxy?.HTTPClient.userController
    .login({
      username: '123',
      password: '123'
    })
    .then(res => {
      console.log(res)
    })
    .finally(() => (loading.value = false))
}

init()
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <el-button
            type="primary"
            icon="Plus"
            @click="handleAdd"
            >新增商品</el-button
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
