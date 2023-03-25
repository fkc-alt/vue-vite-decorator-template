import { Injectable } from '@/support/core'

@Injectable()
export default class OrderService {
  public Log(): void {
    console.log('this is OrderService')
  }
}
