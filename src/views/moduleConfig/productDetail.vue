<script lang="ts" setup>
const { proxy } = getCurrentInstance()!

onBeforeRouteUpdate(leaveGuard => {
  console.log(leaveGuard.meta)
})
proxy!.$route.meta.title = '哈哈哈'
</script>

<template>
  <div>123123</div>
</template>
