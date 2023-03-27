<script lang="ts">
import { Options, Vue } from 'vue-property-decorator'

@Options({})
export default class Index extends Vue {
  public state = {
    checked: true
  }

  override mounted() {
    console.log(this.application, 'mounted')
  }

  public getPager(pager: Record<string, any>): void {
    console.log(pager)
  }

  public change(value: boolean): void {
    console.log('changed: ', value)
    this.state.checked = value
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
      :checked="state.checked"
      @reset="getPager"
      @change="change"
    />
  </div>
</template>
