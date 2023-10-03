import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class SpceService {
  constructor(private readonly requestService: RequestService) {}
  public add<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public update<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public list<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public delete<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public shelve<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public offShelve<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public offShelveBatch<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public shelveBatch<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
