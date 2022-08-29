<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { getOrderList } from "@/apis/modules/order";

const state = reactive<Service.OrderListRes>({
    orderList: []
});

onMounted(()=>{
    getOrderList({ current: 1, pageSize: 10 }).then(res => {
        state.orderList = res.data.orderList;
    })
})
</script>

<template>
    <div>123</div>
</template>