import { Inject, Injectable, Param, ParseIntPipe, DefaultValuePipe } from '@/support/core'

@Injectable()
export default class ArticleService {
  @Inject()
  public Log (
    @Param('id', new DefaultValuePipe(10000), new ParseIntPipe()) id: number | Record<string, any>, @Param('name', new DefaultValuePipe('落魄前端')) name: string | Record<string, any>): void {
    console.log('this is ArticleService', id, name, '1')
  }
}
