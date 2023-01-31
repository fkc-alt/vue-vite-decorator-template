import { Injectable } from '@/support/core'
import { randomKey } from '.'

@Injectable()
export class Utils {
  randomKey (): ReturnType<typeof randomKey> {
    return randomKey()
  }
}
