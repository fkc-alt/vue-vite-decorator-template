```
/**
 * 类装饰器
 * @param constructor 类的构造函数
 */
function classDecorator(constructor: Function){}

/**
 * 属性装饰器
 * @param target 静态属性是类的构造函数，实例的属性是类的原型对象
 * @param property 属性名称
 */
function propertyDecorator(target:any, property: string) {}

/**
 * 方法装饰器
 * @param target 静态方法是类的构造函数，实例方法是类的原型对象
 * @param propery 方法名称
 * @param descriptor 方法描述符
 */
function methodDecorator(target: any, propery: string, descriptor: PropertyDescriptor){}

/**
 * 参数装饰器
 * @param target 静态方法是类的构造函数，实例方法是类的原型对象
 * @param methodName 方法名
 * @param paramIndex 参数索引
 */
function paramDecorator(target: any, methodName: string, paramIndex){}
```