<script lang="ts" setup>
import OrderModel from '@/apis/modules/order'

const state = reactive<Service.OrderListRes>({ orderList: [] })
const r = await OrderModel.GetOrderList({ currentPage: 1, pageSize: 10 })
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
