/**
 * @author kaichao.feng
 * @param { CustomerProps.CustomTable.TableProps<any> } props
 * @returns { JSX.Element }
 * @description ElTable二次封装
 */
declare const _default: import('vue').DefineComponent<{
  column: {
    (arrayLength: number): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    (...items: Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    new (arrayLength: number): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    new (...items: Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    isArray: (arg: any) => arg is any[]
    readonly prototype: any[]
    from: (<T>(arrayLike: ArrayLike<T>) => T[]) & (<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any) => U[]) & (<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>) => T_2[]) & (<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any) => U_1[])
    of: <T_4>(...items: T_4[]) => T_4[]
    readonly [Symbol.species]: ArrayConstructor
  }
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  column: {
    (arrayLength: number): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    (...items: Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    new (arrayLength: number): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    new (...items: Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>): Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
    isArray: (arg: any) => arg is any[]
    readonly prototype: any[]
    from: (<T>(arrayLike: ArrayLike<T>) => T[]) & (<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any) => U[]) & (<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>) => T_2[]) & (<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any) => U_1[])
    of: <T_4>(...items: T_4[]) => T_4[]
    readonly [Symbol.species]: ArrayConstructor
  }
}>>, {}>
export default _default
