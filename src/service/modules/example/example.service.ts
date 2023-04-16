import RequestService from '@/service/common/providers/request.service'
import { Injectable } from '@/support/decorators'

@Injectable()
export default class ExampleService {
  constructor(private readonly requestService: RequestService) {}
}
