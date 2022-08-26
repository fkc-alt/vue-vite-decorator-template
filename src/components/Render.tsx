const Render = ({ props }: any):JSX.Element => {
  // 注意点：在tsx之中 不会自动读写 X.value
  return <div {...props}>我是tsx组件</div>
}
export default Render;