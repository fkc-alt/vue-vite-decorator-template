<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
defineOptions({ name: 'Icon' })
const route = inject<RouteRecordRaw>('route')
</script>

<template>
  <el-icon v-if="route?.meta?.icon">
    <component :is="route.meta.icon" />
  </el-icon>
  <span>{{ $t(`${route?.meta?.title}`) || "" }}</span>
</template>
