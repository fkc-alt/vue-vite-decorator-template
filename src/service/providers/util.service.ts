import { Injectable } from '@/support/core'
import { randomKey, deepClone, getRoleIdList, getToken, getUserInfo, mapKeys, removeStorage, setData, setLang, isString, isNumber, isObject, isArray, isFunction, isSymbol } from '@/utils'
import { customPrint } from '@/utils/print'

@Injectable()
export default class UtilService {
  public randomKey (): ReturnType<typeof randomKey> {
    return randomKey()
  }

  public async deepClone (obj: Parameters<typeof deepClone>[0]): ReturnType<typeof deepClone> {
    return await deepClone(obj)
  }

  public getRoleIdList (): ReturnType<typeof getRoleIdList> {
    return getRoleIdList()
  }

  public getToken (): ReturnType<typeof getToken> {
    return getToken()
  }

  public getUserInfo (): ReturnType<typeof getUserInfo> {
    return getUserInfo()
  }

  public mapKeys (obj: Parameters<typeof mapKeys>[0], keymap: Parameters<typeof mapKeys>[1]): ReturnType<typeof mapKeys> {
    return mapKeys(obj, keymap)
  }

  public removeStorage (...data: string[]): ReturnType<typeof removeStorage> {
    return removeStorage(...data)
  }

  public setData (data: Common.StroageType): ReturnType<typeof setData> {
    setData(data)
  }

  public setLang (lang: string): ReturnType<typeof setLang> {
    setLang(lang)
  }

  public customPrint (options: Parameters<typeof customPrint>[0]): ReturnType<typeof customPrint> {
    customPrint(options)
  }

  public isString (target: any): boolean {
    return isString(target)
  }

  public isNumber (target: any): boolean {
    return isNumber(target)
  }

  public isObject (target: any): boolean {
    return isObject(target)
  }

  public isArray (target: any): boolean {
    return isArray(target)
  }

  public isFunction (target: any): boolean {
    return isFunction(target)
  }

  public isSymbol (target: any): boolean {
    return isSymbol(target)
  }
}
