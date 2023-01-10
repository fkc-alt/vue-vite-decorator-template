<script lang="ts" setup>
import { useUserStore } from '@/store/user'
import Navbar from './components/navbar.vue'
import SidebarItem from './components/sidebarItem.vue'
import useResizeHandler from './hooks/ResizeHandler'

const user = useUserStore()
const { roleIdList, routes } = storeToRefs(user)
const { changeRoutes } = user
const [route, router] = [useRoute(), useRouter()]
const { device, opened, isCollapse, setOpened, setCollapse } = useResizeHandler()

watch([roleIdList], () => changeRoutes(router), { immediate: true })
const PROJECTICON = import.meta.env.VITE_APP_PROJECT_ICON
const classObj = computed(() => {
  return {
    'el-menu': true,
    'collapse-menu': isCollapse.value,
    menu: !isCollapse.value,
    'hide-menu': device.value === 'mobile' && !opened.value,
    'fixed-menu': device.value === 'mobile' && opened.value
  }
})
provide('PROJECTICON', PROJECTICON)
</script>

<template>
  <div>
    <ElContainer>
      <div v-if="device === 'mobile' && opened" class="drawer-bg" @click="setOpened(!opened)" />
      <div :class="classObj">
        <ElMenu router mode="vertical" text-color="#bfcbd9" background-color="#304156" active-text-color="#409EFF"
          :collapse="isCollapse" :unique-opened="true" :collapse-transition="false" :default-active="route.path">
          <div class="sidebar-logo-link collapse-logo" @click="router.push('/')">
            <img :src="PROJECTICON" class="sidebar-logo">
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
