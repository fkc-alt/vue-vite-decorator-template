<script lang="ts" setup>
import type { RouteRecordRaw } from 'vue-router'
import { getRoleIdList } from '@/utils'
import Navbar from './components/navbar.vue'
import SidebarItem from './components/sidebarItem.vue'
import useResizeHandler from './hooks/ResizeHandler'

type RoutesFn = (routes: RouteRecordRaw[]) => RouteRecordRaw[]
const [route, router, roles] = [useRoute(), useRouter(), ref(getRoleIdList())]
const { device, opened, isCollapse, setOpened, setCollapse } =
  useResizeHandler()

const routes = computed(() => {
  const routes = router.options.routes.filter(
    (v) => v.path !== '/login' && !v.hidden
  )
  return handleTreeRoutes(handleMapRoutes(routes))
})
const classObj = computed(() => {
  return {
    'el-menu': true,
    'collapse-menu': isCollapse.value,
    menu: !isCollapse.value,
    'hide-menu': device.value === 'mobile' && !opened.value,
    'fixed-menu': device.value === 'mobile' && opened.value
  }
})

const handleMapRoutes: RoutesFn = (routes) => {
  return routes.map((v) => {
    if (v?.children?.length === 1 && v?.meta?.alwaysShow) {
      v = v.children[0]
    }
    if (v?.children && v?.children.length > 1) {
      v.children = handleMapRoutes(v.children)
    }
    return v
  })
}
const handleTreeRoutes: RoutesFn = (routes) => {
  return routes.filter((v) => {
    if (v.meta?.roles?.length) {
      return v.meta.roles.some((o) => roles.value.includes(o))
    }
    if (v?.children?.length) {
      v.children = handleTreeRoutes(v.children)
      return !!v.children?.length && !v.children.every((o) => o.hidden)
    }
    if (!v.meta?.roles || !v.meta?.roles.length) return true
    return false
  })
}
</script>

<template>
  <div>
    <ElContainer>
      <div v-if="device === 'mobile' && opened" class="drawer-bg" @click="setOpened(!opened)" />
      <div :class="classObj">
        <ElMenu router mode="vertical" text-color="#bfcbd9" background-color="#304156" active-text-color="#409EFF"
          :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" :default-active="route.path">
          <div class="sidebar-logo-link collapse-logo" @click="router.push('/')">
            <img src="/system-dev.svg" class="sidebar-logo">
            <h1 v-if="!isCollapse" class="sidebar-title">
              {{ $t("SYSTEM.TITLE") }}
            </h1>
          </div>

          <SidebarItem v-for="routeRecord in routes" :key="routeRecord.path" :item="routeRecord" />
        </ElMenu>
      </div>

      <ElContainer>
        <ElHeader>
          <Navbar :device="device" :is-collapse="isCollapse" :set-collapse="setCollapse" />
        </ElHeader>
        <ElMain>
          <div>
            <RouterView v-slot="{ Component, route }">
              <Transition key="animation" name="fade" appear mode="out-in">
                <Suspense>
                  <template #default>
                    <div>
                      <KeepAlive>
                        <component v-if="route.meta.keepAlive" :is="Component" :key="route.path" />
                      </KeepAlive>
                      <component v-if="!route.meta.keepAlive" :is="Component" :key="route.path" />
                    </div>
                  </template>
                  <template #fallback>
                    Loading...
                  </template>
                </Suspense>
              </Transition>
            </RouterView>
          </div>
        </ElMain>
        <!-- <ElFooter>Footer</ElFooter> -->
      </ElContainer>
    </ElContainer>
  </div>
</template>

<style lang="scss" scoped>
@import "@/styles/layout";
</style>
