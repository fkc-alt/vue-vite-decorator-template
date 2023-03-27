<script lang="ts">
import { Options, Prop, mixins } from 'vue-property-decorator'
import Pager from './mixins/pager'
import Test from './mixins/test'

@Options({ name: 'Index' })
export default class Index extends mixins(Pager, Test) {
  @Prop({
    type: String,
    required: false,
    default: 'Index'
  })
  relationName!: string

  public state = {
    name: 'Decortaor'
  }

  public override created(): void {
    console.log('Decortaor Component: created')
    this.Log()
  }

  public override mounted(): void {
    console.log('Decortaor Component: mounted')
  }

  public destroyed(): void {}

  public Log() {
    console.log(
      'decortaor Component Index',
      this.application.articleController,
      'mixins: pager=====',
      this.pager
    )
  }
}
</script>
<template>
  <div>
    <h1>{{ state.name }}我是自定义组件</h1>
    <h1>我是props: {{ relationName }}</h1>
    <Render />
  </div>
</template>
<style lang="scss" scoped>
div {
  width: 200px;
  height: 200px;
  background: red;
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
}
</style>
