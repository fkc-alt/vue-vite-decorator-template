import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class WechatUserService {
  constructor(private readonly requestService: RequestService) {}
  public list<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
