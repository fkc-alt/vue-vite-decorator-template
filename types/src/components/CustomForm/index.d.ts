/**
 * @author kaichao.feng
 * @param { CustomerProps.CustomForm.CustomFormProps } attrs
 * @returns { JSX.Element }
 * @description ElForm二次封装
 */
declare const _default: import('vue').DefineComponent<{
  formItems: {
    (arrayLength: number): CustomerProps.CustomForm.Component[]
    (...items: CustomerProps.CustomForm.Component[]): CustomerProps.CustomForm.Component[]
    new (arrayLength: number): CustomerProps.CustomForm.Component[]
    new (...items: CustomerProps.CustomForm.Component[]): CustomerProps.CustomForm.Component[]
    isArray: (arg: any) => arg is any[]
    readonly prototype: any[]
    from: (<T>(arrayLike: ArrayLike<T>) => T[]) & (<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any) => U[]) & (<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>) => T_2[]) & (<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any) => U_1[])
    of: <T_4>(...items: T_4[]) => T_4[]
    readonly [Symbol.species]: ArrayConstructor
  }
}, () => JSX.Element, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps, Readonly<import('vue').ExtractPropTypes<{
  formItems: {
    (arrayLength: number): CustomerProps.CustomForm.Component[]
    (...items: CustomerProps.CustomForm.Component[]): CustomerProps.CustomForm.Component[]
    new (arrayLength: number): CustomerProps.CustomForm.Component[]
    new (...items: CustomerProps.CustomForm.Component[]): CustomerProps.CustomForm.Component[]
    isArray: (arg: any) => arg is any[]
    readonly prototype: any[]
    from: (<T>(arrayLike: ArrayLike<T>) => T[]) & (<T_1, U>(arrayLike: ArrayLike<T_1>, mapfn: (v: T_1, k: number) => U, thisArg?: any) => U[]) & (<T_2>(iterable: Iterable<T_2> | ArrayLike<T_2>) => T_2[]) & (<T_3, U_1>(iterable: Iterable<T_3> | ArrayLike<T_3>, mapfn: (v: T_3, k: number) => U_1, thisArg?: any) => U_1[])
    of: <T_4>(...items: T_4[]) => T_4[]
    readonly [Symbol.species]: ArrayConstructor
  }
}>>, {}>
export default _default
