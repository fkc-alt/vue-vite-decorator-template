<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator'

@Options({ name: 'Index' })
export default class Index extends Vue {
  @Prop({
    type: String,
    required: true,
    default: 'Index'
  })
  relationName!: string

  public state = {
    name: 'Decortaor'
  }

  public override created(): void {
    console.log('Decortaor Component: created')
  }

  public override mounted(): void {
    console.log('Decortaor Component: mounted')
  }

  public destroyed(): void {}

  public Log() {
    console.log('decortaor Component Index')
  }
}
</script>
<template>
  <div>
    <h1>{{ state.name }}我是自定义组件</h1>
    <h1>我是props: {{ relationName }}</h1>
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
