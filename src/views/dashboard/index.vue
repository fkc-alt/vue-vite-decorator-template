<!-- eslint-disable @typescript-eslint/no-unused-vars -->
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
const column = reactive(mapColumn({
  handleClick: ({ row }) => {
    router.push(`/order/detail?id=${row.id}`)
  }
}))
const selectionChange = (rows: Service.ArticleItem[]) => {
  console.log(rows)
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
const [r, d] = [await GetArticleList(), await GetTableDataList()]
state.articleList = r.data.articleList
state.tableList = d.data.tableList
onActivated(() => {
  console.log('keep-alive')
})
</script>

<template>
  <div>
    <SvgIcon name="test" />
    <CustomTable ref="refTable" :data="state.articleList" :column="column" @selection-change="selectionChange">
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
</style>
