import type { DefineComponent } from 'vue'
const Render = (Component: any) => {
  // 注意点：在tsx之中 不会自动读写 X.value
  return <Component />
}
export default Render;