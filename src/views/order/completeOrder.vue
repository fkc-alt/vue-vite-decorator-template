<script lang="ts" setup>
import { onMounted, reactive } from "vue";
import { GetOrderList } from "@/apis/modules/order";

const state = reactive<Service.OrderListRes>({ orderList: [] });

onMounted(async ()=> {
    const res = await GetOrderList({ currentPage: 1, pageSize: 10 });
    state.orderList = res.data.orderList;
})
</script>

<template>
    <div>
        <ul>
            <li v-for="item in state.orderList" :key="item.name">{{ item.price }}</li>
        </ul>
    </div>
</template>