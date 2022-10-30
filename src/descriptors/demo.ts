const params = { name: '冯凯超', age: 22 }

type Params = typeof params

function descriptors<T extends object, U> (params: T): Function {
  return function (target: any, name: string, descriptor: any) {
    const oldDescriptor: Function = descriptor.value
    descriptor.value = function (args: U): void {
      Object.keys(params).forEach(key => target[key] = params[key as keyof T])
      target.NumList = args
      oldDescriptor.call(this, ...arguments)
    }
  }
}

class Demo {
  private readonly num = 20
  @descriptors<Params, number[]>(params)
  public Log<T> (args: T): void {
    console.log('Log', this, arguments)
  }
}

function demo () {
  return {
    name: '1'
  }
}

type GetReturnData<T extends Function> = T extends (...args: any) => infer U ? U : never
type arr<T> = T extends Array<infer U> ? U : never
type ar = arr<string[]>
type tuple<T> = T extends [...args: infer U] ? U : never
type pup = tuple<[number, string]>
type d = GetReturnData<typeof demo>

type laststr<T extends string> = T extends `${infer U}${infer _R}` ? U : never
type Pro<T> = T extends Promise<infer U> ? U : never

type Promi = Pro<Promise<GetReturnData<typeof demo>>>
type str = laststr<'123'>

export default new Demo()
