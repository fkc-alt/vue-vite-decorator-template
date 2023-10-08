<script lang="ts" setup>
import HTTPClient from '@/main'
import usePager from '@/hooks/usePager'
import { wechatUserColumn } from './config'

const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  unionId: '',
  openId: '',
  phoneNumber: ''
})
const userList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: userList.value,
    column: wechatUserColumn(),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await HTTPClient.wechatUserController.list(Rest)
    pager.value.total = data.total || 0
    userList.value = data.item || []
  } catch (error) {
  } finally {
    loading.value = false
  }
}
init()
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <ElInput
            v-model="pager.unionId"
            placeholder="请输入unionId"
          />
          <ElInput
            v-model="pager.openId"
            placeholder="请输入openId"
          />
          <ElInput
            v-model="pager.phoneNumber"
            placeholder="请输入手机号码"
            maxlength="11"
          />
          <el-button
            type="primary"
            icon="Search"
            @click="init"
            >查询</el-button
          >
        </div>
      </template>
      <CustomTable
        v-bind="tableProps"
        v-loading="loading"
      />
      <ElPagination
        background
        layout="total, sizes, prev, pager, next, jumper"
        :total="pager.total"
        :page-size="pager.pageSize"
        :current-page="pager.currentPage"
        @current-change="$event => handlePageChange($event, init)"
        @size-change="$event => handleSizeChange($event, init)"
      />
    </ElCard>
  </div>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
  .el-input {
    width: 300px;
  }
  .el-select {
    width: 300px;
  }
  .el-button {
    margin-left: 0;
  }
}
.btn-group {
  text-align: right;
}
:deep(.avatar img) {
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
</style>
