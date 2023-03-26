<script lang="ts">
import { Options, Vue } from 'vue-property-decorator'

@Options({})
export default class Index extends Vue {
  override mounted() {
    console.log(this.application, 'mounted')
  }
}
</script>
<template>
  <div>
    <h2>使用decorator自定义组件</h2>
    <br />
    <br />
    <br />
    <CustomDecorator relationName="decorator" />
  </div>
</template>
