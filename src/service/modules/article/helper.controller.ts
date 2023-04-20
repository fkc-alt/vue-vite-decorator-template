import { Controller, Post } from '@/support/core'
import HelplerService from './providers/helper.service'

@Controller('helper')
export default class HelperController {
  constructor(private readonly helperService: HelplerService) {}

  @Post('/apidoc')
  public getApidoc(config: Core.RequestConfig) {
    return this.helperService.helper(config)
  }
}
