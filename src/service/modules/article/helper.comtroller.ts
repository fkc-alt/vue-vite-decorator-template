import { Controller, Post } from '@/support/core'
import HelplerService from './providers/helper.service'

@Controller()
export default class HelperController {
  constructor(private readonly helper: HelplerService) {}

  @Post('/help')
  public help(config: Core.RequestConfig) {
    return this.helper.helper(config)
  }
}
