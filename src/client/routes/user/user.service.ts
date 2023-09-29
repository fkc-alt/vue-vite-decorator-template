import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class UserService {
  constructor(private readonly requestService: RequestService) {}
  public login<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public getUserInfo<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
