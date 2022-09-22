<script lang="ts" setup>
import { reactive } from "vue";
import { GetOrderDetail } from "@/apis/modules/order";

const state = reactive<Service.OrderDetailRes>({
  orderId: "",
  stock: 0,
  price: 0,
  name: "",
});

const res = await GetOrderDetail({ orderId: "123" });
Object.assign(state, res.data);
</script>

<template>
  <div>
    {{ state.name }}
  </div>
</template>
