import { Injectable } from '@/support/core'

@Injectable()
export default class ContentTypeService {
  public readonly FORM_URLENCODED: string = 'application/x-www-form-urlencoded'
  public readonly FORM_DATA: string = 'multipart/form-data'
  public readonly JSON: string = 'application/json'

  private readonly _contentTypes: Readonly<Record<0 | 1 | 2, string>> = {
    0: this.FORM_URLENCODED,
    1: this.FORM_DATA,
    2: this.JSON
  }

  /**
   * @param {(0 | 1 | 2)} key
   * @return {Record<string, string>}
   * @memberof ContentTypeService
   * @description 0 application/x-www-form-urlencoded
   * @description 1 multipart/form-data
   * @description 2 application/json
   */
  GetContentType(key: 0 | 1 | 2) {
    return { 'Content-Type': this._contentTypes[key] }
  }
}
