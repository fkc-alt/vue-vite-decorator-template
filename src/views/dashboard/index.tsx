import { ElButton } from 'element-plus'
import { application } from '@/service/main'
import CustomTable from '@/components/CustomTable'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { mapColumn } from './tableConfig'
import './index.scss'

export default defineComponent({
  setup() {
    const router = useRouter()
    const refTable = ref<CustomerProps.CustomTable.TableRef>()
    const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
      articleList: [],
      tableList: []
    })
    const tableProps = computed<
      CustomerProps.CustomTable.TableProps<Service.ArticleItem>
    >(() => ({
      data: state.articleList,
      column: mapColumn({
        handleClick({ row }, event) {
          event.stopPropagation()
          void router.push(`/order/detail?id=${row.id as string}`)
        }
      }),
      border: false,
      rowClassName({ rowIndex }) {
        return (
          {
            1: 'warning-row',
            3: 'success-row'
          }[rowIndex] ?? ''
        )
      },
      onSelectionChange(rows: Service.ArticleItem[]) {
        console.log(rows)
      }
    }))
    const toggleSelection = (rows?: Service.ArticleItem[]): void => {
      if (rows != null) {
        rows.forEach(row => {
          refTable.value?.tableRef?.toggleRowSelection(
            row,
            undefined as unknown as boolean
          )
        })
      } else {
        refTable.value?.tableRef?.clearSelection()
      }
    }
    const slots: Partial<
      Record<
        keyof Service.ArticleItem | 'custom',
        CustomerProps.CustomTable.SlotFunc<Service.ArticleItem>
      >
    > = {
      id: ({ row }) => <div>id = {row.id}</div>
    }
    onActivated(() => {
      console.log('keep-alive')
    })
    onMounted(async () => {
      console.log(application)
      const [r, d] = [
        await application.articleController.GetArticleList({
          pageSize: 10,
          currentPage: 1,
          channel: ['1'],
          param: {
            status: 1,
            title: '1235',
            text: '123'
          },
          content: '123',
          checkDemoList: [{ age: 2, name: '123' }]
        }),
        await application.articleController.GetTableDataList({
          pageSize: 10,
          currentPage: 1
        })
      ]
      state.articleList = r.data.articleList
      state.tableList = d.data.tableList
    })
    return () => {
      const svgIconProps = { name: 'test' }
      return (
        <div>
          <SvgIcon {...svgIconProps} />
          <CustomTable
            {...tableProps.value}
            v-slots={slots}
            ref={refTable}
          />
          <ElButton
            onClick={() =>
              toggleSelection([state.articleList[1], state.articleList[2]])
            }
          >
            Toggle selection status of second and third rows
          </ElButton>
        </div>
      )
    }
  }
})
