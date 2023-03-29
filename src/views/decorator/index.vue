<script lang="ts">
import Index from './'
export default Index
</script>
<template>
  <div>
    <h2 class="title">使用decorator自定义组件</h2>
    <br />
    <br />
    <br />
    <CustomDecorator
      relationName="decorator"
      @addToCurrentPage="getPager"
      :checked="state.checked"
      @reset="getPager"
      @change="change"
    />
    <!-- 递归调用当前组件 -->
    <!-- <Index /> or <当前组件的name /> -->
  </div>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
