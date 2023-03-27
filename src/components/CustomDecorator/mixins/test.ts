import { Options, Vue } from 'vue-property-decorator'

@Options({ name: 'Test' })
export default class Test extends Vue {
  public override mounted(): void {
    console.log('mixins Test')
  }
}
