<script lang="ts" setup>
import { GetOrderDetail } from '@/apis/modules/order'

const state = reactive({}) as Service.OrderDetailRes

const r = await GetOrderDetail({ orderId: '123' })
Object.assign(state, r.data)
</script>
<template>
  <div>
    {{ state.name }}
  </div>
</template>
