<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { ElMessage } from 'element-plus'
import { removeStorage, setLang } from '@/utils'
import Breadcurmb from './breadcurmb.vue'

const Props = defineProps<{
  isCollapse: boolean;
  device: string;
  setCollapse(collapse: boolean): void;
}>()
const { isCollapse, device } = toRefs(Props)
// eslint-disable-next-line vue/no-setup-props-destructure
const { setCollapse } = reactive(Props)
const [{ locale }, route, router, { proxy }] = [
  useI18n(),
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
const langChange = (lang: string): void => {
  locale.value = lang
  setLang(lang)
  ElMessage.success(proxy?.$t('MESSAGE.SUCCESS'))
}
</script>
<template>
  <div class="navbar">
    <div class="navbar-left">
      <el-icon @click="changeMenu" :size="30">
        <IEpExpand v-if="!isCollapse" />
        <IEpFold v-else />
      </el-icon>
      <breadcurmb class="bread-curmb" />
    </div>
    <div class="navbar-right">
      <!-- <scroll-full class="scroll-full"></scroll-full> -->
      <el-dropdown trigger="click" :hide-on-click="false">
        <div>
          <img
            src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Finews.gtimg.com%2Fnewsapp_bt%2F0%2F13942804647%2F641&refer=http%3A%2F%2Finews.gtimg.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1666323743&t=a59b3058eb3d19c2260914dc71f01add"
            class="user-avatar" />
            <el-icon>
              <IEpArrowDownBold />
            </el-icon>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/" style="text-decoration: unset">
              <el-dropdown-item>{{
                  $t("WORKBENCHMODULE.TITLE")
              }}</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <el-dropdown trigger="click" placement="left-start" @command="langChange">
                <span>{{ $t("SYSTEM.LANG")
                }}<i class="el-icon-arrow-down el-icon--right"></i></span>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="zh">{{
                        $t("SYSTEM.ZH")
                    }}</el-dropdown-item>
                    <el-dropdown-item divided command="hk">{{
                        $t("SYSTEM.HK")
                    }}</el-dropdown-item>
                    <el-dropdown-item divided command="en">{{
                        $t("SYSTEM.EN")
                    }}</el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </el-dropdown-item>
            <el-dropdown-item divided @click="logout">
              {{ $t("SYSTEM.LOGOUT") }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
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
    width: 40px;
    height: 40px;
    border-radius: 10px;
  }
}
</style>
