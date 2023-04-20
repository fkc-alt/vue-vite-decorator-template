import { Controller, Post } from '@/support/core'

@Controller()
export default class HelperController {
  @Post('/help')
  public help(config: any) {
    console.log('object', config)
  }
}
