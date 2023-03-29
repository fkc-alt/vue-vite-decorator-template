import UploadService from '@/service/common/providers/upload.service'
import { Injection } from '@/support/vueDecorator'
import { Options, Vue } from 'vue-property-decorator'

@Options({ name: 'Test' })
export default class Test extends Vue {
  @Injection()
  public readonly uploadService!: UploadService

  public override mounted(): void {
    console.log('mixins Test')
  }
}
