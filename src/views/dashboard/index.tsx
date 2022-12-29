import { GetArticleList, GetTableDataList } from '@/apis'
import Table from '@/components/Table'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mapHeaders } from './tableConfig'
import '.'
export default defineComponent({
  setup () {
    const router = useRouter()
    const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
      articleList: [],
      tableList: []
    })
    const headers = reactive(mapHeaders<Service.ArticleItem>({
      handleClick: ({ row }) => {
        void router.push(`/order/detail?id=${row.id}`)
      }
    }))
    onMounted(async () => {
      const [r, d] = [await GetArticleList(), await GetTableDataList()]
      state.articleList = r.data.articleList
      state.tableList = d.data.tableList
    })
    return () => (
      <div>
        <SvgIcon {...{ name: 'test' }} />
        <Table data={state.articleList} headers={headers} />
      </div>
    )
  }
})
