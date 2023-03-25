type Tuple = [number, string]
interface Obj {
  name: string
  age: number
}
type ArrItem = string[]
type InferCapitalize<T extends string> =
  T extends `${infer U}${infer R}${infer C}`
    ? `${Uppercase<U>}${Uppercase<R>}${C}`
    : T
type InferTuple<T> = T extends [first: infer U, ...args: any] ? U : never
type InferArrItem<T> = T extends Array<infer U> ? U : never
type InferValue<T> = T extends { name: infer U } ? U : never
type InferUnion<T> = T extends { name: infer U; age: infer K } ? U | K : never
const count: InferTuple<Tuple> = 123
const item: InferArrItem<ArrItem> = 'string'
const value: InferValue<Obj> = 'name'
const unionValue: InferUnion<Obj> = 123
const str: InferCapitalize<'hello world'> = 'HEllo world'
console.log(count, item, value, unionValue, str)
// eslint-disable-next-line @typescript-eslint/array-type, @typescript-eslint/no-unused-vars
type d = number[] extends (infer U)[] ? U : never
export {}
