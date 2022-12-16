<script lang="ts" setup>
import { GetOrderDetail } from '@/apis/modules/order'

const route = useRoute()

const state = reactive({}) as Service.OrderDetailRes

const r = await GetOrderDetail({ orderId: route.query.id as string })
Object.assign(state, r.data)
</script>
<template>
  <div>
    {{ state.name }}
  </div>
</template>
