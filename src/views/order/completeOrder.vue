<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { getOrderList } from "@/apis/modules/order";

const state = reactive<Service.OrderListRes>({
    orderList: []
});

onMounted(async()=>{
    const data = await getOrderList<Service.OrderListReq, Service.OrderListRes>({ current: 1, pageSize: 10 })
    state.orderList = data.orderList;
})
</script>

<template>
    <div>123</div>
</template>