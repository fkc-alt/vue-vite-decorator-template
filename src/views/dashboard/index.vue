<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { ArticleModuleFactory } from '@/service/modules/article/article.module'
import { mapColumn } from './tableConfig'
type Row = CustomerProps.CustomTable.SlotProp<Service.ArticleItem>

const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const router = useRouter()
const loading = ref(false)
const tableProps = computed<CustomerProps.CustomTable.TableProps<Service.ArticleItem>>(() => ({
  data: state.articleList,
  column: mapColumn({
    handleClick ({ row }, event) {
      event.stopPropagation()
      router.push(`/order/detail?id=${row.id}`)
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
const init = async () => {
  loading.value = true
  const [r, d] = [await ArticleModuleFactory.articleController.GetArticleList({
    pageSize: 10,
    currentPage: 1,
    channel: ['1'],
    param: { status: 0, title: '123' },
    checkDemoList: [{ age: 2, name: '123' }]
  }), await ArticleModuleFactory.articleController.GetTableDataList({ pageSize: 10, currentPage: 1 })]
  state.articleList = r.data.articleList
  state.tableList = d.data.tableList
  loading.value = false
}
onActivated(() => {
  console.log('keep-alive')
})
init()
</script>

<template>
  <div>
    <SvgIcon name="test" />
    <CustomTable ref="refTable" v-bind="tableProps" v-loading="loading">
      <template #id="{ row }: Row">
        <div>id = {{ row.id }}</div>
        <Render />
      </template>
      <template #title="{ row }: Row">
        <div>title = {{ row.title }}</div>
      </template>
    </CustomTable>
    <ElButton @click="toggleSelection([state.articleList[1], state.articleList[2]])">Toggle selection status of second and third rows</ElButton>
    <ElButton @click="toggleSelection()">Clear selection</ElButton>
  </div>
</template>

<style lang="scss" scoped>
:deep(.btn) {
  font-size: 14px;
}
:deep(.el-table .warning-row) {
  background: #fdf6ec !important;
}
:deep(.el-table .success-row) {
  background: #f0f9eb !important;
}
</style>
