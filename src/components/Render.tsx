import { resolveDynamicComponent } from "vue";
const Render = (props:any) => {
  const Component = props.item?.meta?.icon ? resolveDynamicComponent(props.item.meta.icon) : <></>
  // 注意点：在tsx之中 不会自动读写 X.value
  return (
    <>
      {/* {props.item?.meta?.icon && <el-icon size={30}><component is={props.item.meta.icon} /></el-icon>} */}
      {props.item?.meta?.icon && <el-icon size={30}><Component /></el-icon>}
      <span>{ props.proxy.$t(`${props.item.meta?.title}`) || "" }</span>
    </>
  )
}
export default Render;