const Render = (props:any) => {
  // 注意点：在tsx之中 不会自动读写 X.value
  return (
    <>
      {props.item?.meta?.icon && <el-icon size={30}><Icon icon={props.item.meta.icon} /></el-icon>}
      <span>{ props.proxy.$t(`${props.item.meta?.title}`) || "" }</span>
    </>
  )
}
export default Render;