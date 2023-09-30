import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class CategoryService {
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
}
