export declare namespace Core {
  export interface ModuleMetadata {
    imports?: Array<Constructor<any>>
    controllers?: Array<Constructor<any>>
    providers?: Array<Constructor<any>>
  }
  export type Constructor<T = any> = new (...args: any[]) => T
  export interface ClassProvider<T> {
    provide: Constructor<T>
    useClass: Constructor<T>
  }
}
