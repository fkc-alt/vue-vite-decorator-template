<script lang="ts" setup>
import { toRefs } from "vue";
import { RouteRecordRaw } from "vue-router";
defineOptions({ name: "SidebarItem" });
const Props = defineProps<{
  item: RouteRecordRaw;
}>();
const { item } = toRefs(Props);
</script>

<template>
  <div v-if="!item.hidden">
    <template v-if="item?.children?.length">
      <el-sub-menu :index="item.path" popper-append-to-body>
        <template #title>
          <div>
            <el-icon v-if="item?.meta?.icon">
              <component :is="item.meta.icon" />
            </el-icon>
            <span>{{ $t(`${item.meta?.title}`) || "" }}</span>
          </div>
        </template>
        <sidebar-item
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        ></sidebar-item>
      </el-sub-menu>
    </template>
    <template v-else>
      <el-menu-item :index="item.path">
        <div>
          <el-icon v-if="item?.meta?.icon">
            <component :is="item.meta.icon" />
          </el-icon>
          <span>{{ $t(`${item.meta?.title}`) || "" }}</span>
        </div>
      </el-menu-item>
    </template>
  </div>
</template>
