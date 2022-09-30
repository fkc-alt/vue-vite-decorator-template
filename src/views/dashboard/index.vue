<script lang="ts" setup>
import { reactive } from "vue";
import { GetArticleList } from "@/apis";

const state = reactive<Service.ArticleListRes>({
  articleList: [],
});
const r = await GetArticleList();
state.articleList = r.data.articleList;
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
