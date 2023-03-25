import { ARRAY, FUNCTION, NUMBER, OBJECT, STRING, SYMBOL } from './contsant'

export const isString = (target: any): boolean => {
  return Object.prototype.toString.call(target) === STRING
}

export const isNumber = (target: any): boolean => {
  return Object.prototype.toString.call(target) === NUMBER
}

export const isObject = (target: any): boolean => {
  return Object.prototype.toString.call(target) === OBJECT
}

export const isArray = (target: any): boolean => {
  return Object.prototype.toString.call(target) === ARRAY
}

export const isFunction = (target: any): boolean => {
  return Object.prototype.toString.call(target) === FUNCTION
}

export const isSymbol = (target: any): boolean => {
  return Object.prototype.toString.call(target) === SYMBOL
}

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined'

export const isNil = (val: any): val is null | undefined =>
  isUndefined(val) || val === null

export const getUserInfo = (): string | null => {
  return JSON.parse(sessionStorage.getItem('userInfo') ?? '')
}

export const getToken = (): string => {
  return sessionStorage.getItem('token') ?? ''
}

export const getRoleIdList = (): number[] => {
  return (
    sessionStorage
      .getItem('roleIdList')
      ?.split(',')
      .map((v: string | number) => +v) ?? []
  )
}

export const setData = (data: Common.StroageType): void => {
  for (const [key, value] of Object.entries(data)) {
    sessionStorage.setItem(key, value)
  }
}

export const removeStorage = (...data: string[]): boolean => {
  data.forEach(key => sessionStorage.removeItem(key))
  return true
}

export const setLang = (lang: string): void => {
  sessionStorage.setItem('lang', lang)
}

export const randomKey = (): string => Math.random().toString(16).slice(2, 8)

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const mapKeys = <T extends Record<string, any>>(obj: T, keyMap: T): T =>
  JSON.parse(
    JSON.stringify(obj).replace(
      new RegExp(`/(${Object.keys(obj).join('|')})/gi`),
      $0 => keyMap[$0]
    )
  )

export const deepClone = async <T extends Record<string, any>>(
  obj: T
): Promise<T> => {
  return await new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(obj)
    port2.onmessage = ({ data }) => resolve(data)
  })
}
