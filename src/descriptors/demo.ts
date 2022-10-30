function demo (): Record<'name', string> {
  return {
    name: '1'
  }
}

type GetReturnData<T extends () => unknown> = T extends (...args: unknown[]) => infer U ? U : never
// eslint-disable-next-line @typescript-eslint/no-unused-vars
type d = GetReturnData<typeof demo>

export default demo
