import Table from './Table'

const Render = (props: unknown): JSX.Element => {
  // 注意点：在tsx之中 不会自动读写 X.value
  return <Table data={[]} headers={[]} />
}
export default Render
