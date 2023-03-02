<script lang="ts" setup>
import { OrderModuleFactory } from '@/service/modules/order/order.module'
import { UserModuleFactory } from '@/service/modules/user/user.module'

const state = reactive<Service.OrderListRes>({ orderList: [] })
const r = await OrderModuleFactory.orderController.GetOrderList({ currentPage: 1, pageSize: 10 })
const p = await UserModuleFactory.userController.UserInfo({ id: 1, phone: '17223418891' })
console.log(p)
state.orderList = r.data.orderList
</script>

<template>
  <div>
    <img :src="Test" alt="" />
    <ul>
      <li
        v-for="item in state.orderList"
        :key="item.name"
      >
        {{ item.price }}
      </li>
    </ul>
  </div>
</template>
