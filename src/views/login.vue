<script lang="ts" setup>
import type { RouteLocationRaw } from 'vue-router'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { Enums } from '~@/typings/enums/roles'
import { useUserStore } from '@/store/user'
import { setData } from '@/utils'

const { proxy } = getCurrentInstance()!
const [router, route] = [useRouter(), useRoute()]
const user = useUserStore()
const [loading, ruleFormRef] = [ref<boolean>(false), ref<FormInstance>()]
const projectName = import.meta.env.VITE_APP_PROJECT_TITLE
const formRules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: proxy?.$t('LOGIN.FORMRULES.USERNAME[0]'),
      trigger: 'blur'
    },
    {
      min: 3,
      max: 12,
      message: proxy?.$t('LOGIN.FORMRULES.USERNAME[1]'),
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: proxy?.$t('LOGIN.FORMRULES.PASSWORD[0]'),
      trigger: 'blur'
    },
    {
      min: 6,
      max: 18,
      message: proxy?.$t('LOGIN.FORMRULES.PASSWORD[1]'),
      trigger: 'blur'
    }
  ]
})
const loginForm = reactive<Service.LoginReq>({
  username: import.meta.env.VITE_APP_PROJECT_USERNAME,
  password: import.meta.env.VITE_APP_PROJECT_PASSWORD
})
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  formEl.validate((valid, fields) => {
    if (valid) {
      proxy?.HTTPClient.userController
        .login(loginForm)
        .then(({ data }) => {
          console.log(data, '11111')
          const roleIdList = [Enums.Roles.ADMIN, Enums.Roles.OP]
          user.forRoot({
            userInfo: 'admin',
            roleIdList
          })
          setData({
            roleIdList
          })
          const redirect = (route.query &&
            route.query.redirect) as RouteLocationRaw
          ElMessage.success(proxy?.$t('SYSTEM.LOGINMESSAGE'))
          router.push(redirect || '/')
        })
        .catch((error: string) => {
          console.log(`Error：${error}`)
        })
        .finally(() => (loading.value = false))
    } else {
      loading.value = false
      console.log('error submit!', fields)
    }
  })
}
</script>

<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <!-- <img
          class="logo"
          src="favicon.ico"
        /> -->
        <div class="name">
          <div class="title">青春庭社商城</div>
          <div class="tips">{{ projectName }}</div>
        </div>
      </div>
      <el-form
        label-position="top"
        :rules="formRules"
        :model="loginForm"
        ref="ruleFormRef"
        class="login-form"
      >
        <el-form-item
          label="账号"
          prop="username"
        >
          <el-input
            type="text"
            v-model.trim="loginForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          prop="password"
        >
          <el-input
            type="password"
            v-model.trim="loginForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button
            style="width: 100%"
            type="primary"
            @click="submit(ruleFormRef)"
            >立即登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<style scoped lang="scss">
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  .login-container {
    width: 420px;
    height: 500px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0px 21px 41px 0px rgba(0, 0, 0, 0.2);
    .head {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 40px 0 20px 0;
    }
    .head {
      img {
        width: 100px;
        height: 100px;
        margin-right: 20px;
      }
      .name {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .title {
          font-size: 28px;
          color: #1baeae;
          font-weight: bold;
        }
        .tips {
          font-size: 12px;
          color: #999;
        }
      }
    }
  }
  .login-form {
    width: 70%;
    margin: 0 auto;
  }
}
</style>
