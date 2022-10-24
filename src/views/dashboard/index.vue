<script lang="ts" setup>
import { reactive } from "vue";
import { GetArticleList, GetTableDataList } from "@/apis";

const state = reactive<Service.ArticleListRes & Service.TableDataRes>({
  articleList: [],
  tableList: [],
});
const [r, d] = [await GetArticleList(), await GetTableDataList()];
state.articleList = r.data.articleList;
state.tableList = d.data.tableList;
</script>

<template>
  <div>
    <el-table :data="state.articleList">
      <el-table-column prop="id" label="Id" width="180" />
      <el-table-column prop="title" label="Title" width="180" />
      <el-table-column prop="content" label="Content" />
      <el-table-column prop="description" label="Description" />
    </el-table>
  </div>
</template>
