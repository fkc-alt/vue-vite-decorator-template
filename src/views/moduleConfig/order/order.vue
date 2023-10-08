<script lang="ts" setup>
import HTTPClient from '@/main'
import usePager from '@/hooks/usePager'
import { orderColumn, TradeStateOptions } from '../config'

const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  orderId: '',
  userId: '',
  outTradeNo: '',
  spOpenid: '',
  tradeState: ''
})
const orderList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: orderList.value,
    column: orderColumn(),
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
    orderList.value = data.item || []
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
            v-model.trim="pager.orderId"
            placeholder="请输入订单id"
          />
          <ElInput
            v-mode.triml="pager.userId"
            placeholder="请输入会员id"
          />
          <ElInput
            v-model.trim="pager.outTradeNo"
            placeholder="请输入商户系统订单号"
          />
          <ElInput
            v-model.trim="pager.spOpenid"
            placeholder="请输入下单openid"
            maxlength="11"
          />
          <ElSelect
            v-model="pager.tradeState"
            clearable
            placeholder="请选择订单状态"
          >
            <ElOption
              v-for="trade in TradeStateOptions"
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
