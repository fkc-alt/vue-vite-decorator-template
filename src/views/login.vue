<script lang="ts" setup>
import { ref, reactive, getCurrentInstance, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { setData } from "@/utils";
// 访问Vue原型的属性
const { proxy } = getCurrentInstance() as any;
const router = useRouter();
const route = useRoute();
const loading = ref<boolean>(false);
const ruleFormRef = ref<FormInstance>();
const myRef = ref<HTMLElement | null>();
const formRules = reactive<FormRules>({
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      min: 3,
      max: 12,
      message: "用户名长度在 3 到 12 个字符",
      trigger: "blur",
    },
  ],
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 18, message: "密码长度在 6 到 18 个字符", trigger: "blur" },
  ],
});

const loginForm = reactive({
  username: "system",
  password: "zoetis12345678",
});
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      setData({ token: "123456" });
      const redirect: any = route.query && route.query.redirect;
      router.push(redirect || "/");
    } else {
      console.log("error submit!", fields);
    }
  });
};
onMounted(()=>{
  console.log(myRef.value)
})
</script>

<template>
  <div class="login-container">
    <el-form
      ref="ruleFormRef"
      :model="loginForm"
      :rules="formRules"
      class="login-form"
      label-position="left"
      label-width="80px"
    >
      <div class="title-container">
        <h3 class="title mixin" ref="myRef">{{ $t("SYSTEM.TITLE") }}</h3>
      </div>

      <el-form-item label="用户名" prop="username">
        <el-input v-model="loginForm.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          :loading="loading"
          @click="submit(ruleFormRef)"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
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
