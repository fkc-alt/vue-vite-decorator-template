<script lang="tsx" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { mapHeaders } from './tableConfig'
const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})
const router = useRouter()
const headers = computed(() => mapHeaders({
  handleClick: ({ row }) => {
    router.push(`/order/detail?id=${row.id}`)
  }
}))
const [r, d] = [await GetArticleList(), await GetTableDataList()]
state.articleList = r.data.articleList
state.tableList = d.data.tableList
</script>

<template>
  <div>
    <svg-icon name="test"></svg-icon>
    <Table :data="state.articleList" :headers="headers" />
  </div>
</template>

<style lang="scss" scoped>
:deep(.btn) {
  font-size: 14px;
}
</style>
