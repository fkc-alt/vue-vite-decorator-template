<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import Icon from './icon.vue'
defineOptions({ name: 'SidebarItem' })
const Props = defineProps<{ item: RouteRecordRaw }>()
const { item } = toRefs(Props)
provide('route', item)
</script>

<template>
  <div v-if="!item.hidden">
    <template v-if="item.children && item.children.length">
      <ElSubMenu :index="item.path" popper-append-to-body>
        <template #title>
          <Icon />
        </template>
        <sidebar-item
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        ></sidebar-item>
      </ElSubMenu>
    </template>
    <template v-else>
      <ElMenuItem :index="item.path">
        <Icon />
      </ElMenuItem>
    </template>
  </div>
</template>
