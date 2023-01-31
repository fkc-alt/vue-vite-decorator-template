import { Injectable } from '@/support/core'
import { randomKey, deepClone, getRoleIdList, getToken, getUserInfo, mapKeys, removeStorage, setData, setLang } from '@/utils'

@Injectable()
export class Utils {
  randomKey (): ReturnType<typeof randomKey> {
    return randomKey()
  }

  async deepClone (obj: Parameters<typeof deepClone>[0]): ReturnType<typeof deepClone> {
    return await deepClone(obj)
  }

  getRoleIdList (): ReturnType<typeof getRoleIdList> {
    return getRoleIdList()
  }

  getToken (): ReturnType<typeof getToken> {
    return getToken()
  }

  getUserInfo (): ReturnType<typeof getUserInfo> {
    return getUserInfo()
  }

  mapKeys (obj: Parameters<typeof mapKeys>[0], keymap: Parameters<typeof mapKeys>[1]): ReturnType<typeof mapKeys> {
    return mapKeys(obj, keymap)
  }

  removeStorage (...data: string[]): ReturnType<typeof removeStorage> {
    return removeStorage(...data)
  }

  setData (data: Common.StroageType): ReturnType<typeof setData> {
    setData(data)
  }

  setLang (lang: string): ReturnType<typeof setLang> {
    setLang(lang)
  }
}
