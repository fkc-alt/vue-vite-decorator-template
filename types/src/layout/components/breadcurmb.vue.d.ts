declare const _default: {
  new (...args: any[]): {
    $: import('vue').ComponentInternalInstance
    $data: {}
    $props: Partial<{}> & Omit<Readonly<import('vue').ExtractPropTypes<{}>> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, never>
    $attrs: {
      [x: string]: unknown
    }
    $refs: {
      [x: string]: unknown
    }
    $slots: Readonly<{
      [name: string]: import('vue').Slot | undefined
    }>
    $root: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null
    $parent: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null
    $emit: (event: string, ...args: any[]) => void
    $el: any
    $options: import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string> & {
      beforeCreate?: ((() => void) | Array<() => void>) | undefined
      created?: ((() => void) | Array<() => void>) | undefined
      beforeMount?: ((() => void) | Array<() => void>) | undefined
      mounted?: ((() => void) | Array<() => void>) | undefined
      beforeUpdate?: ((() => void) | Array<() => void>) | undefined
      updated?: ((() => void) | Array<() => void>) | undefined
      activated?: ((() => void) | Array<() => void>) | undefined
      deactivated?: ((() => void) | Array<() => void>) | undefined
      beforeDestroy?: ((() => void) | Array<() => void>) | undefined
      beforeUnmount?: ((() => void) | Array<() => void>) | undefined
      destroyed?: ((() => void) | Array<() => void>) | undefined
      unmounted?: ((() => void) | Array<() => void>) | undefined
      renderTracked?: (((e: import('vue').DebuggerEvent) => void) | Array<(e: import('vue').DebuggerEvent) => void>) | undefined
      renderTriggered?: (((e: import('vue').DebuggerEvent) => void) | Array<(e: import('vue').DebuggerEvent) => void>) | undefined
      errorCaptured?: (((err: unknown, instance: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void) | Array<(err: unknown, instance: import('vue').ComponentPublicInstance<{}, {}, {}, {}, {}, {}, {}, {}, false, import('vue').ComponentOptionsBase<any, any, any, any, any, any, any, any, any, {}, {}, string>, {}> | null, info: string) => boolean | void>) | undefined
    }
    $forceUpdate: () => void
    $nextTick: typeof import('vue').nextTick
    $watch: <T extends string | ((...args: any) => any)>(source: T, cb: T extends (...args: any) => infer R ? (args_0: R, args_1: R) => any : (...args: any) => any, options?: import('vue').WatchOptions<boolean> | undefined) => import('vue').WatchStopHandle
  } & Readonly<import('vue').ExtractPropTypes<{}>> & import('vue').ShallowUnwrapRef<{}> & {} & import('vue').ComponentCustomProperties & {}
  __isFragment?: undefined
  __isTeleport?: undefined
  __isSuspense?: undefined
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{}>>, {}, {}, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, {}, {}, string> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps
export default _default
