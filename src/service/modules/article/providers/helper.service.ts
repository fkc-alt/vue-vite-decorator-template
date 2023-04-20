import RequestService from '@/service/common/providers/request.service'

export default class HelplerService extends RequestService {
  public helper(configure: Core.RequestConfig) {
    return this.request(configure)
  }
}
