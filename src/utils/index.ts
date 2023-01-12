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

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, no-eval
export const mapKeys = <T extends Record<string, any>>(obj: T, keyMap: T): T => JSON.parse(JSON.stringify(obj).replace(new RegExp(eval(`/(${Object.keys(obj).join('|')})/gi`)), ($0) => keyMap[$0]))

export const deepClone = async <T extends Record<string, any>>(obj: T): Promise<T> => {
  return await new Promise(resolve => {
    const { port1, port2 } = new MessageChannel()
    port1.postMessage(obj)
    port2.onmessage = ({ data }) => resolve(data)
  })
}
