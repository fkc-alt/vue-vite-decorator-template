<script lang="ts" setup>
const projectName = import.meta.env.VITE_APP_PROJECT_TITLE
</script>
<template>
  <div class="dashboard-container">
    <div class="dashboard-text">用户名: admin</div>
    <h2>Hello admin ！ 欢迎登录{{ projectName }}</h2>
  </div>
</template>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
