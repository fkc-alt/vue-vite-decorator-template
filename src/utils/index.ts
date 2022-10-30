interface StroageType {
  [key: string]: unknown
}

export const getUserInfo = (): string | null => {
  return JSON.parse(sessionStorage.getItem('userInfo') ?? '')
}

export const getToken = (): string => {
  return sessionStorage.getItem('token') ?? ''
}

export const getRoleIdList = (): number[] => {
  return (sessionStorage.getItem('roleIdList'))?.split(',').map((v: string | number) => +v) ?? []
}

export const setData = (data: StroageType): void => {
  for (const key in data) {
    sessionStorage.setItem(key, data[key] as string)
  }
}

export const removeStorage = (...data: string[]): boolean => {
  data.forEach(key => sessionStorage.removeItem(key))
  return true
}

export const setLang = (lang: string): void => {
  sessionStorage.setItem('lang', lang)
}
