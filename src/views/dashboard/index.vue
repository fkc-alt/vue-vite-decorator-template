<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { mapHeaders } from './tableConfig'
type Row = CustomerProps.CustomTable.SlotProp<Service.ArticleItem>
const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const router = useRouter()
const headers = reactive(mapHeaders({
  handleClick: ({ row }) => {
    router.push(`/order/detail?id=${row.id}`)
  }
}))
const selectionChange = (e: unknown) => {
  console.log(e)
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
</script>

<template>
  <div>
    <svg-icon name="test"></svg-icon>
    <CustomTable ref="refTable" :data="state.articleList" :headers="headers" @selection-change="selectionChange">
      <template #id="{ row }: Row">
        <div>id = {{ row.id }}</div>
        <Render />
      </template>
      <template #title="{ row }: Row">
        <div>title = {{ row.title }}</div>
      </template>
    </CustomTable>
    <el-button @click="toggleSelection([state.articleList[1], state.articleList[2]])">Toggle selection status of second and third rows</el-button>
    <el-button @click="toggleSelection()">Clear selection</el-button>
  </div>
</template>

<style lang="scss" scoped>
:deep(.btn) {
  font-size: 14px;
}
</style>
