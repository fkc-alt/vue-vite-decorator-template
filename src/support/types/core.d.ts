declare namespace Core {
  interface ModuleMetadata {
    imports?: Array<Constructor<any>>
    controllers?: Array<Constructor<any>>
    providers?: Array<
      | Constructor<any>
      | {
          provide: string
          useFactory: () => any
        }
      | {
          provide: string
          useValue: any
        }
    >
    exports?: Array<Constructor<any>>
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
  interface PipeTransform<T = any, R = any> {
    /**
     * Method to implement a custom pipe.  Called with two parameters
     *
     * @param value argument before it is received by route handler method
     */
    transform(value: T): R
  }
  interface RequestConfig {
    url?: string
    method?: import('./enums').Method
    headers?: Record<string, string | number | boolean>
    params?: any
    data?: D
  }
}
