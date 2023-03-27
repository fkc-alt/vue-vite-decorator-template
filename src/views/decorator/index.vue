<script lang="ts">
import { Options, Vue } from 'vue-property-decorator'

@Options({})
export default class Index extends Vue {
  override mounted() {
    console.log(this.application, 'mounted')
  }

  public getPager(pager: Record<string, any>): void {
    console.log(pager)
  }
}
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
      @reset="getPager"
    />
  </div>
</template>
