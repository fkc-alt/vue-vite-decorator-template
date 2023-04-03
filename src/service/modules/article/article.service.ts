import {
  Inject,
  Injectable,
  Param,
  ParseIntPipe,
  DefaultValuePipe
} from '@/support/core'

class CustomValidationPipe implements Core.PipeTransform<string, string> {
  transform(value: string): string {
    throw new Error('Method not implemented.')
  }
}

@Injectable()
export default class ArticleService {
  @Inject()
  public Log(
    @Param(['id', 'price'], new DefaultValuePipe('1000.99'), new ParseIntPipe())
    record: number | Record<string, any>,
    @Param('name', new DefaultValuePipe('落魄前端'))
    name: string | Record<string, any>,
    @Param('customElements', new CustomValidationPipe())
    custom: string | Record<string, any>
  ): void {
    console.log('this is ArticleService', record, name, custom, 'custom')
  }
}
