/* eslint-disable no-new */
/* eslint-disable new-cap */
/* eslint-disable @typescript-eslint/ban-types */
import { Injectable, Module } from './service'

type Type<T> = new (...args: any[]) => T
type Constructor<T = any> = new (...args: any[]) => T
interface ClassProvider<T> {
  provide: Type<T>
  useClass: Type<T>
}

// const Types = (type: any): (target: Function) => void => Reflect.metadata('design:type', type)
export const ParamTypes = (...type: any): (target: Function) => void => Reflect.metadata('design:paramtypes', type)
// const ReturnType = (type: any): (target: Function) => void => Reflect.metadata('design:returntype', type)

class Container {
  providers = new Map<Type<any>, ClassProvider<any>>()
  /**
   * 注册
   */
  addProvider<T>(provider: ClassProvider<T>): void {
    this.providers.set(provider.provide, provider)
  }

  /**
   * 获取
   */
  inject (token: Type<any>): Type<any> | undefined {
    return this.providers.get(token)?.useClass
  }
}
export const Factory = <T>(target: Constructor<T>): T => {
  // 获取所有注入的服务
  const providers = Reflect.getMetadata('providers', target)
  // 下面的Continer就是我们之前建立的数据仓库，我们把依赖放进去
  const continer = new Container()
  for (let i = 0; i < providers.length; i++) {
    continer.addProvider({ provide: providers[i], useClass: providers[i] })
  }
  const controllers = Reflect.getMetadata('controllers', target)
  for (let i = 0; i < controllers.length; i++) {
    const currNeedProviders = Reflect.getMetadata('design:paramtypes', controllers[i])
    if (!currNeedProviders) continue
    const args = currNeedProviders.map((provider: any) => {
      const currentNeedPro: any = continer.inject(provider)
      return new currentNeedPro()
    })
    controllers[i] = new controllers[i](...args)
  }
  return new target(...controllers)
}

class Hobby {
  age = 20
}

@Injectable()
@ParamTypes(Hobby)
class Person {
  constructor (readonly hobby: Hobby) {}
  test (): void {
    console.log(this.hobby.age)
  }
}

@Module({
  controllers: [Person],
  providers: [Hobby]
})
class C {
  constructor (readonly person: Person) {}
  Log (): void {
    this.person.test()
  }
}
export default Factory(C)
