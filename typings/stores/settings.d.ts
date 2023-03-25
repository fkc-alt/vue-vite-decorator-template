declare namespace Store {
  type Ref<T = unknown> = import('vue').Ref<T>
  type Prop<T, D> = T extends Ref ? Ref<D> : D
  interface Options<T = {}> {
    isCollapse: Prop<T, boolean>
    device: Prop<T, string>
    opened: Prop<T, boolean>
    setOpened: (data: boolean) => void
    setCollapse: (data: boolean) => void
  }
  type Settings<T> = T extends Ref
    ? Options<T>
    : Omit<Options, 'setOpened' | 'setCollapse'>
}
