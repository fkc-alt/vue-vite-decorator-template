import { Injectable, RequestConfig, RequestService } from 'http-typedi'

@Injectable()
export class ReservationService {
  constructor(private readonly requestService: RequestService) {}
  public list<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public updateState<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }

  public detail<T, R>(config: RequestConfig<T>): Promise<R> {
    return this.requestService.request(config)
  }
}
