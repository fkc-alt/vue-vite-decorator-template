import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class ProductService {
  constructor(private readonly requestService: RequestService) {}
  public add<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public addProperties<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public delProperties<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
