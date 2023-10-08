<script lang="ts" setup>
import HTTPClient from '@/main'
import { goodsColumn, orderLogColumn } from '../config'

const route = useRoute()
const loading = ref(false)
const address = ref<any>(null)
const goodsList = ref<any[]>([])
const orderLogList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: goodsList.value,
    column: goodsColumn(),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const logTableProps = computed<CustomerProps.CustomTable.TableProps<any>>(
  () => {
    return {
      data: orderLogList.value,
      column: orderLogColumn(),
      border: false,
      maxHeight: '600px',
      emptyText: '暂无数据'
    }
  }
)

const init = async () => {
  loading.value = true
  try {
    const { data } = await HTTPClient.orderController.log({
      orderId: (route as any).query.orderId
    })
    orderLogList.value = data || []
  } catch (error) {}
  try {
    const { data: adressDetail } =
      (await HTTPClient.reservationHelperController.getOrderAddressDetail({
        orderId: (route as any).query.orderId
      })) as any
    address.value = adressDetail
  } catch (error) {}
  try {
    const { data: list } =
      (await HTTPClient.reservationHelperController.getOrderGoodsList({
        orderId: (route as any).query.orderId
      })) as any
    goodsList.value = list || []
  } catch (error) {}
  loading.value = false
}
init()
</script>
<template>
  <div v-loading="loading">
    <ElCard>
      <ElDescriptions
        title="收货地址"
        border
      >
        <ElDescriptionsItem label="姓名">{{
          address?.contactName
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="手机号">{{
          address?.phoneNumber
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="收货地址"
          >{{ address?.province }}{{ address?.city }}{{ address?.area
          }}{{ address?.fullAddress }}</ElDescriptionsItem
        >
      </ElDescriptions>
      <ElDescriptions
        title="商品列表"
        class="custom-good__list"
      >
        <ElDescriptionsItem>
          <CustomTable v-bind="tableProps"
        /></ElDescriptionsItem>
      </ElDescriptions>
      <ElDescriptions
        title="操作日志"
        class="custom-good__list"
      >
        <ElDescriptionsItem>
          <CustomTable v-bind="logTableProps"
        /></ElDescriptionsItem>
      </ElDescriptions>
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
.el-descriptions {
  margin-bottom: 30px;
}
:deep(.custom-good__list .el-descriptions__body) {
  overflow-x: auto;
}
</style>
