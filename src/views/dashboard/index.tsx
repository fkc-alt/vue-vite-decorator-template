import { GetArticleList, GetTableDataList } from '@/apis'
import CustomTable from '@/components/CustomTable'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mapHeaders } from './tableConfig'
import './index.scss'
import { ElButton } from 'element-plus'

export default defineComponent({
  setup () {
    const router = useRouter()
    const refTable = ref<CustomerProps.CustomTable.TableRef>()
    const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
      articleList: [],
      tableList: []
    })
    const headers = reactive(mapHeaders({
      handleClick: ({ row }) => {
        void router.push(`/order/detail?id=${row.id as string}`)
      }
    }))
    const change = (e: unknown): void => {
      console.log(e)
    }
    const rowClassName: CustomerProps.CustomTable.ColumnCls<Service.ArticleItem> = ({ rowIndex }) => {
      return ({
        1: 'warning-row',
        3: 'success-row'
      }[rowIndex] ?? '')
    }
    const toggleSelection = (rows?: Service.ArticleItem[]): void => {
      if (rows != null) {
        rows.forEach((row) => {
          refTable.value?.tableRef?.toggleRowSelection(row, undefined as unknown as boolean)
        })
      } else {
        refTable.value?.tableRef?.clearSelection()
      }
    }
    onMounted(async () => {
      const [r, d] = [await GetArticleList(), await GetTableDataList()]
      state.articleList = r.data.articleList
      state.tableList = d.data.tableList
    })
    return () => (
      <div>
        <SvgIcon { ...{ name: 'test' } } />
        <CustomTable ref={refTable} { ...{ data: state.articleList, headers, rowClassName } } onSelection-change={change} />
        <ElButton onClick={() => toggleSelection([state.articleList[1], state.articleList[2]])}>Toggle selection status of second and third rows</ElButton>
      </div>
    )
  }
})
