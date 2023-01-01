/* eslint-disable @typescript-eslint/no-explicit-any */

export const getUserInfo = (): string | null => {
  return JSON.parse(sessionStorage.getItem('userInfo') ?? '')
}

export const getToken = (): string => {
  return sessionStorage.getItem('token') ?? ''
}

export const getRoleIdList = (): number[] => {
  return (sessionStorage.getItem('roleIdList'))?.split(',').map((v: string | number) => +v) ?? []
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

export const deepClone = <T extends Record<string, any>>(obj: T, cb: (obj: T) => void): void => {
  const { port1, port2 } = new MessageChannel()
  port1.postMessage(obj)
  port2.onmessage = ({ data }) => cb(data)
}
