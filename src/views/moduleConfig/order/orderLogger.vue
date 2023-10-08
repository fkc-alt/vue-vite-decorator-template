<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import HTTPClient from '@/main'
import { orderLogColumn } from '../config'

const orderId = ref('')
const loading = ref(false)
const orderLogList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: orderLogList.value,
    column: orderLogColumn(),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const init = async () => {
  if (!orderId.value) {
    ElMessage.warning('请输入订单ID')
    return
  }
  loading.value = true
  try {
    const { data } = await HTTPClient.orderController.log({
      orderId: orderId.value
    })
    orderLogList.value = data || []
  } catch (error) {
  } finally {
    loading.value = false
  }
}
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <ElInput
            v-model.trim="orderId"
            placeholder="请输入订单id"
          />
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
