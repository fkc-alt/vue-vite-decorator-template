import { Options, Vue } from 'vue-property-decorator'

@Options({})
export default class Index extends Vue {
  public state = {
    checked: true
  }

  override mounted() {
    console.log(this.application, 'mounted')
  }

  public getPager(pager: Record<string, any>): void {
    console.log(pager)
  }

  public change(value: boolean): void {
    console.log('changed: ', value)
    this.state.checked = value
  }
}
