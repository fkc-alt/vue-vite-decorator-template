<script lang="ts" setup>
import HTTPClient from '@/main'
import usePager from '@/hooks/usePager'
import { reservationColumn, ReservationStateOptions } from './config'

const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  orderId: '',
  userId: '',
  time: '',
  state: ''
})
const reservationList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: reservationList.value,
    column: reservationColumn(),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await HTTPClient.orderController.list(Rest)
    pager.value.total = data.total || 0
    reservationList.value = data.item || []
  } catch (error) {
  } finally {
    loading.value = false
  }
}
init()
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <ElInput
            v-model="pager.orderId"
            placeholder="请输入订单id"
          />
          <ElSelect
            v-model="pager.state"
            clearable
            placeholder="请选择订单状态"
          >
            <ElOption
              v-for="trade in ReservationStateOptions"
              :key="trade.value"
              :value="trade.value"
              :label="trade.label"
            />
          </ElSelect>
          <el-button
            type="primary"
            icon="Search"
            @click="init"
            >查询</el-button
          >
        </div>
      </template>
      <CustomTable
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
