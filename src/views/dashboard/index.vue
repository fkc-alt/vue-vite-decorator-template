<script lang="ts" setup>
import { GetArticleList, GetTableDataList } from '@/apis'
import { Table } from '@/components/ElTable'
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
