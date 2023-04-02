import { Options, Vue } from 'vue-property-decorator'
import ContentTypeService from '@/service/common/providers/contentType.service'
import RequestService from '@/service/common/providers/request.service'
import UtilService from '@/service/common/providers/util.service'
import { Injection } from '@/support/vueDecorator'

// Demo
const config = {
  url: 'http://localhost'
}

@Options({ name: 'DecoratorExample' })
export default class Index extends Vue {
  @Injection()
  public readonly requestService!: RequestService

  @Injection()
  public readonly utilService!: UtilService

  @Injection(config)
  public readonly options!: typeof config

  @Injection(ContentTypeService)
  public readonly contentTypeService!: ContentTypeService

  public state = {
    checked: true
  }

  override mounted() {
    console.log(this.application, 'mounted', this.requestService)
  }

  public getPager(pager: Record<string, any>): void {
    console.log(pager, 'pager')
  }

  public change(value: boolean): void {
    console.log('changed: ', value, this.utilService.isArray([]), this)
    this.state.checked = value
  }
}