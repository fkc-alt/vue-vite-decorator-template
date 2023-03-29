<script lang="ts">
import { Options, Prop, mixins, Emit } from 'vue-property-decorator'
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

  @Prop({
    type: Boolean,
    required: false,
    default: false
  })
  checked!: boolean

  public state = {
    name: 'Decortaor'
  }

  @Emit()
  public addToCurrentPage(n: number): Record<string, any> {
    this.pager.currentPage += n
    return this.pager
  }

  @Emit('reset')
  public resetPager(): Record<string, any> {
    this.pager = {
      pageSize: 10,
      currentPage: 1,
      total: 0
    }
    return this.pager
  }

  @Emit('change')
  public changeChecked(): boolean {
    return !this.checked
  }

  public override created(): void {
    console.log('Decortaor Component: created')
    this.Log()
  }

  public override mounted(): void {
    console.log('Decortaor Component: mounted', this.application)
  }

  public destroyed(): void {}

  public Log() {
    console.log(
      'decortaor Component Index',
      this.uploadService,
      'mixins: pager=====',
      this.pager
    )
  }
}
</script>
<template>
  <div>
    <h1 @click="addToCurrentPage(2)">{{ state.name }}我是自定义组件</h1>
    <h1 @click="resetPager">我是props: {{ relationName }}</h1>
    <h2 @click="changeChecked">{{ checked + '' }}</h2>
    <Render />
  </div>
</template>
<style lang="scss" scoped>
div {
  width: 200px;
  height: 200px;
  background: var(--el-color-primary);
  border-radius: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  gap: 20px;
  user-select: none;
  color: var(--el-color-white);
}
</style>
