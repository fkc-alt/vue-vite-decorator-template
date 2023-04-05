/* eslint-disable @typescript-eslint/ban-types */
export const applyDecorators = (
  ...decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator>
): MethodDecorator => {
  return function (
    target: Object,
    propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    for (const decorator of decorators) {
      if (target instanceof Function && !descriptor) {
        ;(decorator as ClassDecorator)(target)
        continue
      }
      ;(decorator as MethodDecorator | PropertyDecorator)(
        target,
        propertyKey,
        descriptor
      )
    }
  }
}
