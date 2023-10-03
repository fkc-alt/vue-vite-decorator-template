<script lang="ts" setup>
import usePager from '@/hooks/usePager'
import { spceColumn } from './config'

const { proxy } = getCurrentInstance()!
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager()
const swiperList = ref<Service.IndexConfig.QuerySwiperConfigItem[]>([])

const tableProps = computed<
  CustomerProps.CustomTable.TableProps<Service.IndexConfig.QuerySwiperConfigItem>
>(() => {
  return {
    data: swiperList.value,
    column: spceColumn(),
    border: false,
    height: '600px',
    emptyText: '暂无数据',
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
            >增加</el-button
          >
          <el-popconfirm
            title="确定删除吗？"
            confirmButtonText="确定"
            cancelButtonText="取消"
            @confirm="handleDelete"
          >
            <template #reference>
              <el-button
                type="danger"
                :icon="Delete"
                >批量删除</el-button
              >
            </template>
          </el-popconfirm>
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
