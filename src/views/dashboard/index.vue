<script lang="ts" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { headers } from './constant'
const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: []
})

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
