export const CatchError = () => {
  return function (target: object, key: string, descriptor: PropertyDescriptor): void {
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function (...args: any) {
      try {
        const result = fn.apply(this, args)
        return result
      } catch (error: any) {
        // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
        console.log(`CatchError: ${error}`)
      }
    }
  }
}
