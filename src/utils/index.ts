
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
