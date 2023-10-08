import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class OrderService {
  constructor(private readonly requestService: RequestService) {}
  public list<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public log<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}