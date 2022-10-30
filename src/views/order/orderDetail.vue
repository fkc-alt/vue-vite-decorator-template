<script lang="ts" setup>
import { reactive } from 'vue'
import { GetOrderDetail } from '@/apis/modules/order'

const state = reactive<Service.OrderDetailRes>({
  orderId: '',
  stock: 0,
  price: 0,
  name: ''
})

const r = await GetOrderDetail({ orderId: '123' })
Object.assign(state, r.data)
</script>
<template>
  <div>
    {{ state.name }}
  </div>
</template>
