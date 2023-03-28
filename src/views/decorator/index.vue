<script lang="ts">
import Index from './'
export default Index
</script>
<template>
  <div>
    <h2>使用decorator自定义组件</h2>
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
  </div>
</template>
<style lang="scss" scoped>
@import './index.scss';
</style>
