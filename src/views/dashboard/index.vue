
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import { GetTableData } from '@/apis';
import { getToken } from '@/utils';
const tableList = ref<Service.RecordTableList>([]);
onMounted(async ()=> {
 const r = await GetTableData({ token: getToken() });
 tableList.value = r.data.tableList;
})
</script>

<template>
    <div>
        <el-table :data="tableList">
            <el-table-column prop="date" label="Date" width="180" />
            <el-table-column prop="name" label="Name" width="180" />
            <el-table-column prop="address" label="Address" />
        </el-table>
    </div>  
</template>
