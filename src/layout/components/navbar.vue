<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { removeStorage } from '@/utils'
import Breadcurmb from './breadcurmb.vue'

const PROJECTICON = inject<string>('PROJECTICON')
const Props = defineProps<{
  isCollapse: boolean
  device: string
  setCollapse(collapse: boolean): void
}>()
const { isCollapse, device } = toRefs(Props)
// eslint-disable-next-line vue/no-setup-props-destructure
const { setCollapse } = reactive(Props)
const [route, router, { proxy }] = [
  useRoute(),
  useRouter(),
  getCurrentInstance() as ComponentInternalInstance
]

const logout = (): void => {
  removeStorage('token', 'roleIdList')
  ElMessage.success(proxy?.$t('SYSTEM.LOGOUTMESSAGE'))
  router.push(`/login?redirect=${route.fullPath}`)
}
const changeMenu = (): void => {
  if (device.value === 'mobile') {
    setCollapse(false)
    return
  }
  setCollapse(!isCollapse.value)
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-left">
      <ElIcon
        @click="changeMenu"
        :size="30"
      >
        <IEpExpand v-if="!isCollapse" />
        <IEpFold v-else />
      </ElIcon>
      <breadcurmb class="bread-curmb" />
    </div>
    <div class="navbar-right">
      <!-- <scroll-full class="scroll-full"></scroll-full> -->
      <ElDropdown
        trigger="click"
        :hide-on-click="false"
      >
        <div>
          <img
            :src="PROJECTICON"
            class="user-avatar"
          />
          <ElIcon>
            <IEpArrowDownBold />
          </ElIcon>
        </div>
        <template #dropdown>
          <ElDropdownMenu>
            <RouterLink
              to="/"
              style="text-decoration: unset"
            >
              <ElDropdownItem>{{ $t('WORKBENCHMODULE.TITLE') }}</ElDropdownItem>
            </RouterLink>
            <ElDropdownItem
              divided
              @click="logout"
            >
              {{ $t('SYSTEM.LOGOUT') }}
            </ElDropdownItem>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;

  &-left {
    display: flex;

    .collapse {
      font-size: 25px;
      padding: 0 15px;
      cursor: pointer;
    }

    .bread-curmb {
      display: flex;
      align-items: center;
    }
  }

  &-right {
    display: flex;
    align-items: center;
    padding: 7px 0;

    .scroll-full {
      padding-right: 10px;
      cursor: pointer;
    }
  }

  .user-avatar {
    cursor: pointer;
    width: 30px;
    height: 30px;
    border-radius: 10px;
  }
}
</style>
