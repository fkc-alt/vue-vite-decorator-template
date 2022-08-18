<script lang="ts" setup>
import { toRefs, getCurrentInstance } from "vue";
import { RouteRecordRaw } from "vue-router";
defineOptions({ name: "SidebarItem" });
import Render from "@/components/Render.tsx";
const Props = defineProps<{
  item: RouteRecordRaw;
}>();
const { item } = toRefs(Props);
const { proxy } = getCurrentInstance();
</script>

<template>
  <div v-if="!item.hidden">
    <template v-if="item?.children?.length">
      <el-sub-menu :index="item.path" popper-append-to-body>
        <template #title>
          <Render :item="item" :proxy="proxy" />
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
        <Render :item="item" :proxy="proxy" />
      </el-menu-item>
    </template>
  </div>
</template>
