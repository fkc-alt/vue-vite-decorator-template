import { randomKey, deepClone, getRoleIdList, getToken, getUserInfo, mapKeys, removeStorage, setData, setLang } from '@/utils'
import { customPrint } from '@/utils/print'
export default class UtilService {
  randomKey (): ReturnType<typeof randomKey>
  deepClone (obj: Parameters<typeof deepClone>[0]): ReturnType<typeof deepClone>
  getRoleIdList (): ReturnType<typeof getRoleIdList>
  getToken (): ReturnType<typeof getToken>
  getUserInfo (): ReturnType<typeof getUserInfo>
  mapKeys (obj: Parameters<typeof mapKeys>[0], keymap: Parameters<typeof mapKeys>[1]): ReturnType<typeof mapKeys>
  removeStorage (...data: string[]): ReturnType<typeof removeStorage>
  setData (data: Common.StroageType): ReturnType<typeof setData>
  setLang (lang: string): ReturnType<typeof setLang>
  customPrint (options: Parameters<typeof customPrint>[0]): ReturnType<typeof customPrint>
  isString (target: any): boolean
  isNumber (target: any): boolean
  isObject (target: any): boolean
  isArray (target: any): boolean
  isFunction (target: any): boolean
  isSymbol (target: any): boolean
}
