import { Injectable } from '@/support/core'

@Injectable()
export default class ArticleService {
  public Log (): void {
    console.log('this is ArticleService')
  }
}
