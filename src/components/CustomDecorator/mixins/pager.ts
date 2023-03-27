import { Options, Vue } from 'vue-property-decorator'

@Options({})
export default class Pager extends Vue {
  public pager = {
    pageSize: 10,
    currentPage: 1,
    total: 0
  }
}
