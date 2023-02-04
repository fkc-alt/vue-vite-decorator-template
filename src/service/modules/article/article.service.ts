import { Inject, Injectable, Param } from '@/support/core'

@Injectable()
export default class ArticleService {
  @Inject()
  public Log (@Param('id') id: any): void {
    console.log('this is ArticleService', id)
  }
}
