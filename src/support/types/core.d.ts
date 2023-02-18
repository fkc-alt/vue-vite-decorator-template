declare namespace Core {
  interface ModuleMetadata {
    imports?: Array<Constructor<any>>
    controllers?: Array<Constructor<any>>
    providers?: Array<Constructor<any>>
  }
  type Constructor<T = any> = new (...args: any[]) => T
  interface ClassProvider<T> {
    provide: Constructor<T>
    useClass: Constructor<T>
  }
  type ParamData = object | string | number
  interface RouteParamMetadata {
    index: number
    data?: ParamData
    pipe?: Array<Constructor<any> | Record<string, any>>
  }
}
