import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class ProductService {
  constructor(private readonly requestService: RequestService) {}
  public add<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public del<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public detail<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public update<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public list<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public propertiesList<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public addProperties<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public updateProperties<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public delProperties<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
