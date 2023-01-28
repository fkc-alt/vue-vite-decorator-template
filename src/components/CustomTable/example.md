# TSX组件使用方式
### React版本
```
import CustomTable from '@/components/CustomTable'
export default defineComponent({
  setup () {
    const router = useRouter()
    const refTable = ref<CustomerProps.CustomTable.TableRef>()
    const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
      articleList: [],
      tableList: []
    })
    const tableProps = computed<CustomerProps.CustomTable.TableProps<Service.ArticleItem>>(() => ({
      data: state.articleList,
      column: mapColumn({
        handleClick ({ row }, event) {
          event.stopPropagation()
          void router.push(`/order/detail?id=${row.id as string}`)
        }
      }),
      border: false,
      rowClassName ({ rowIndex }) {
        return ({
          1: 'warning-row',
          3: 'success-row'
        }[rowIndex] ?? '')
      },
      onSelectionChange (rows: Service.ArticleItem[]) {
        console.log(rows)
      }
    }))
    const toggleSelection = (rows?: Service.ArticleItem[]): void => {
      if (rows != null) {
        rows.forEach((row) => {
          refTable.value?.tableRef?.toggleRowSelection(row, undefined as unknown as boolean)
        })
      } else {
        refTable.value?.tableRef?.clearSelection()
      }
    }
    const slots: Partial<Record<keyof Service.ArticleItem | 'custom', CustomerProps.CustomTable.SlotFunc<Service.ArticleItem>>> = {
      id: ({ row }) => <div>id = {row.id}</div>
    }
    return () => {
      const svgIconProps = { name: 'test' }
      return (
        <div>
          <CustomTable { ...tableProps.value } v-slots={ slots } ref={refTable} />
          <ElButton onClick={() => toggleSelection([state.articleList[1], state.articleList[2]])}>Toggle selection status of second and third rows</ElButton>
        </div>
      )
    }
  }
})
```

### Vue3版本
```
<script lang="ts" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { mapColumn } from './tableConfig'
type Row = CustomerProps.CustomTable.SlotProp<Service.ArticleItem>

const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const router = useRouter()
const tableProps = computed<CustomerProps.CustomTable.TableProps<Service.ArticleItem>>(() => ({
  data: state.articleList,
  column: mapColumn({
    handleClick ({ row }, event) {
      event.stopPropagation()
    }
  }),
  border: false,
  rowClassName ({ rowIndex }) {
    return ({
      1: 'warning-row',
      3: 'success-row'
    }[rowIndex] ?? '')
  },
  onSelectionChange (rows: Service.ArticleItem[]) {
    console.log(rows)
  },
  onRowClick () {
    console.log('onRowClick')
  }
}))
const toggleSelection = (rows?: Service.ArticleItem[]): void => {
  if (rows != null) {
    rows.forEach((row) => {
      refTable.value?.tableRef?.toggleRowSelection(row, undefined as unknown as boolean)
    })
  } else {
    refTable.value?.tableRef?.clearSelection()
  }
}
onActivated(() => {
  console.log('keep-alive')
})
init()
</script>

<template>
 <CustomTable ref="refTable" v-bind="tableProps">
      <template #id="{ row }: Row">
        <div>id = {{ row.id }}</div>
        <Render />
      </template>
      <template #title="{ row }: Row">
        <div>title = {{ row.title }}</div>
      </template>
    </CustomTable>
</template>
```