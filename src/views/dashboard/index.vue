<script lang="ts" setup>
import { reactive } from "vue";
import { GetTableData } from "@/apis";

const state = reactive<Service.TableDataReq & Service.TableDataRes>({
  tableList: [],
  currentPage: 1,
  pageSize: 10,
});
const r = await GetTableData({
  currentPage: state.currentPage,
  pageSize: state.pageSize,
});
state.tableList = r.data.tableList;
</script>

<template>
  <div>
    <el-table :data="state.tableList">
      <el-table-column prop="date" label="Date" width="180" />
      <el-table-column prop="name" label="Name" width="180" />
      <el-table-column prop="address" label="Address" />
    </el-table>
  </div>
</template>
