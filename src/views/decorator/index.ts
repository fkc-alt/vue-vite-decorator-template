/* eslint-disable new-cap */
import UtilService from '@/service/common/providers/util.service'
import { Injection } from '@/support/vueDecorator'
import { Options, Vue } from 'vue-property-decorator'

@Options({ name: 'DecoratorExample' })
export default class Index extends Vue {
  public state = {
    checked: true
  }

  @Injection()
  public utils!: UtilService

  override mounted() {
    console.log(this.application, 'mounted')
  }

  public getPager(pager: Record<string, any>): void {
    console.log(pager)
  }

  public change(value: boolean): void {
    console.log('changed: ', value, this.utils.isArray([]), this)
    this.state.checked = value
  }
}
