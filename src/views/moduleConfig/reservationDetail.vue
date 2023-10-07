<script lang="ts" setup>
import HTTPClient from '@/main'
import { goodsColumn, ReservationStateOptions } from './config'

const route = useRoute()
const loading = ref(false)
const address = ref<any>(null)
const orderDetail = ref<any>(null)
const goodsList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: goodsList.value,
    column: goodsColumn(),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const status = computed(() => {
  return (
    ReservationStateOptions.find(v => v.value === orderDetail?.state)?.label! ||
    ''
  )
})

const init = async () => {
  loading.value = true
  const { data: detail } = (await HTTPClient.reservationController.detail({
    id: +(route as any).query.id
  })) as any
  orderDetail.value = detail
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
        title="预约详情"
        border
      >
        <ElDescriptionsItem label="订单id">{{
          orderDetail?.orderId
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="宿舍信息">{{
          orderDetail?.dormInfo
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="服务日期">{{
          new Date(orderDetail?.serviceDate).toLocaleString()
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="服务时间">{{
          orderDetail?.serviceTime
        }}</ElDescriptionsItem>
        <ElDescriptionsItem label="订单状态">{{ status }}</ElDescriptionsItem>
        <ElDescriptionsItem label="订单备注">{{
          orderDetail?.remark
        }}</ElDescriptionsItem>
      </ElDescriptions>
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
