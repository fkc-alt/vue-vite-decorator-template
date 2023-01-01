<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
defineOptions({ name: 'Icon' })
const route = inject<RouteRecordRaw>('route') || {} as RouteRecordRaw
</script>

<template>
  <span>
    <ElIcon v-if="route?.meta?.icon">
      <component :is="route.meta.icon" />
    </ElIcon>
    <span>{{ $t(`${route?.meta?.title}`) }}</span>
  </span>
</template>
