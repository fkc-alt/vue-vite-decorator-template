<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import type { RouteLocationRaw } from 'vue-router'
import { FormInstance, FormRules, ElMessage } from 'element-plus'
import { useUserStore } from '@/store/user'
import ServiceModule from '@/service'
import { setData } from '@/utils'
// Look Vue Prototype property
const [{ proxy }, MODE] = [
  getCurrentInstance() as ComponentInternalInstance,
  import.meta.env.MODE === 'dev'
]
const [router, route] = [useRouter(), useRoute()]
const user = useUserStore()
const { save } = user
const [loading, ruleFormRef, myRef] = [
  ref<boolean>(false),
  ref<FormInstance>(),
  ref<HTMLElement | null>()
]
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
  username: MODE ? 'system' : '',
  password: MODE ? '12345678' : ''
})
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  loading.value = true
  await formEl.validate((valid, fields) => {
    if (valid) {
      ServiceModule.UserController.Login(loginForm)
        .then(({ data: { token, roles: roleIdList } }) => {
          save({ userInfo: 'Test', token, roleIdList })
          setData({ token, roleIdList })
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
onMounted(() => {
  console.log(myRef.value)
})
</script>

<template>
  <div class="login-container">
    <ElForm
      ref="ruleFormRef"
      :model="loginForm"
      :rules="formRules"
      class="login-form"
      label-position="left"
      label-width="80px"
    >
      <div class="title-container">
        <h3
          ref="myRef"
          class="title mixin"
        >
          {{ $t("SYSTEM.TITLE") }}
        </h3>
      </div>

      <ElFormItem
        :label="$t('LOGIN.FORM.USERNAME')"
        prop="username"
      >
        <ElInput v-model="loginForm.username" />
      </ElFormItem>
      <ElFormItem
        :label="$t('LOGIN.FORM.PASSWORD')"
        prop="password"
      >
        <ElInput
          v-model="loginForm.password"
          type="password"
        />
      </ElFormItem>
      <ElFormItem>
        <ElButton
          type="primary"
          :loading="loading"
          @click="submit(ruleFormRef)"
        >
          {{ $t("SYSTEM.LOGIN") }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss" scoped>
$bg: #fff;
$dark_gray: #889aa4;
$light_gray: #000;
.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #454545;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
:deep(.el-form-item__label) {
  font-size: 17px;
}
</style>
