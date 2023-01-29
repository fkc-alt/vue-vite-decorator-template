import { getToken } from '@/utils'

export const AuthGuard = (exclude: string[]) => {
  return function (target: object, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
    const fn: (...args: any) => any = descriptor.value
    descriptor.value = function (...args: any) {
      const hasAuth = exclude.every(item => !new RegExp(`${item}$`).test(args[0].url)) && !getToken()
      if (hasAuth) throw new Error('Please provide a token')
      const result = fn.apply(this, args)
      return result
    }
  }
}

export const CatchError = () => {
  return function (target: object, key: string, descriptor: PropertyDescriptor): void {
    // eslint-disable-next-line @typescript-eslint/ban-types
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
