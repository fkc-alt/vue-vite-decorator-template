<style scoped lang="scss">
@import "../styles/layout.scss";
</style>

<script lang="ts" setup>
import { computed, ref, Ref } from "vue";
import { useRoute, useRouter, RouteRecordRaw } from "vue-router";
import Navbar from "./components/navbar.vue";
import SidebarItem from "./components/sidebarItem.vue";
import useResizeHandler from "./mixin/ResizeHandler";

const route = useRoute();
const router = useRouter();
const { device, opened, isCollapse, setOpened, setCollapse } = useResizeHandler();
const roles:Ref<Array<string | number>> = ref([101]);

const routes = computed(() => {
  const routes = router.options.routes.filter(
    (v) => v.path !== "/login" && !v.hidden
  );
  return handleTreeRoutes(handleMapRoutes(routes));
});
const classObj = computed(() => {
  return {
    "is-collapse": isCollapse.value,
    "is-opened": opened.value,
    "is-mobile": device.value === "mobile",
    "is-desktop": device.value === "desktop",
  };
});

const handleClickOutside = () => {
  setOpened(!opened.value);
};
const handleMapRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.map((v) => {
    if (v?.children?.length === 1 && v?.meta?.alwaysShow) {
      v = v.children[0];
    }
    if (v?.children && v?.children.length > 1) {
      v.children = handleMapRoutes(v.children);
    }
    return v;
  });
};
const handleTreeRoutes = (routes: RouteRecordRaw[]): RouteRecordRaw[] => {
  return routes.filter((v) => {
    if (v.meta?.roles?.length) {
      return v.meta.roles.some((o) => roles.value.includes(o));
    }
    if (v?.children?.length) {
      v.children = handleTreeRoutes(v.children);
      return !!v.children?.length && !v.children.every((o) => o.hidden);
    }
    if (!v.meta?.roles || !v.meta?.roles.length) return true;
  });
};
</script>
<template>
  <div>
    <el-container>
      <div
        v-if="device === 'mobile' && opened"
        class="drawer-bg"
        @click="handleClickOutside"
      />
      <div :class="classObj">
        <el-menu
          router
          mode="vertical"
          text-color="#bfcbd9"
          background-color="#304156"
          active-text-color="#409EFF"
          :collapse="isCollapse"
          :unique-opened="true"
          :collapse-transition="false"
          :default-active="route.path"
        >
          <div
            class="sidebar-logo-link collapse-logo"
            @click="router.push('/')"
          >
            <img
              src="https://www.zoetis.cn/global-assets/favicons/apple-touch-icon-76x76.png"
              class="sidebar-logo"
            />
            <h1 class="sidebar-title" v-if="!isCollapse">
              {{ $t("SYSTEM.TITLE") }}
            </h1>
          </div>

          <sidebar-item
            v-for="route in routes"
            :key="route.path"
            :item="route"
          ></sidebar-item>
        </el-menu>
      </div>

      <el-container>
        <el-header>
          <Navbar
            :device="device"
            :isCollapse="isCollapse"
            :setCollapse="setCollapse"
          />
        </el-header>
        <el-main>
          <div>
            <router-view v-slot="{ Component, route }">
              <transition mode="out-in" name="fade">
                <suspense>
                  <template #default>
                    <component :is="Component" :key="route.path" />
                  </template>
                   <template #fallback> Loading... </template>
                </suspense>
              </transition>
            </router-view>
          </div>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>
