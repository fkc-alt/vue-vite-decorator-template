import { Injectable } from '@/support/core'

export enum ContentType {
  FORM_URLENCODED,
  FORM_DATA,
  JSON
}

@Injectable()
export default class ContentTypeService {
  public readonly FORM_URLENCODED: string = 'application/x-www-form-urlencoded'
  public readonly FORM_DATA: string = 'multipart/form-data'
  public readonly JSON: string = 'application/json'

  private readonly _contentTypes: Readonly<Record<ContentType, string>> = {
    [ContentType.FORM_URLENCODED]: this.FORM_URLENCODED,
    [ContentType.FORM_DATA]: this.FORM_DATA,
    [ContentType.JSON]: this.JSON
  }

  /**
   * @param {ContentType} ContentType
   * @return {Record<string, string>}
   * @memberof ContentTypeService
   * @description 0 application/x-www-form-urlencoded
   * @description 1 multipart/form-data
   * @description 2 application/json
   */
  GetContentType(key: ContentType) {
    return { 'Content-Type': this._contentTypes[key] }
  }
}
