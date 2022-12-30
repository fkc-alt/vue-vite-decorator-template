<script lang="ts" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { mapHeaders } from './tableConfig'
const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})
const router = useRouter()
const headers = reactive(mapHeaders({
  handleClick: ({ row }) => {
    router.push(`/order/detail?id=${row.id}`)
  }
}))
const selectionChange = (e: unknown) => {
  console.log(e)
}
const [r, d] = [await GetArticleList(), await GetTableDataList()]
state.articleList = r.data.articleList
state.tableList = d.data.tableList
</script>

<template>
  <div>
    <svg-icon name="test"></svg-icon>
    <Table :data="state.articleList" :headers="headers" @selection-change="selectionChange" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.btn) {
  font-size: 14px;
}
</style>
