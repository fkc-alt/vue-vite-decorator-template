<script lang="ts">
import Index from './'
import './index.scss'
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
  </div>
</template>
