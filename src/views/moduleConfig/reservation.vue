<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import HTTPClient from '@/main'
import usePager from '@/hooks/usePager'
import { reservationColumn, ReservationStateOptions } from './config'

const router = useRouter()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  orderId: '',
  userId: '',
  time: [],
  state: ''
})
const reservationList = ref<any[]>([])
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: reservationList.value,
    column: reservationColumn({
      async handleUpdate(scope: any, e: Event) {
        e.preventDefault()
        const ReqJson = {
          id: scope.row.id,
          state: ''
        } as any
        if (scope.row.state === 'TO_BE_SERVED') {
          ReqJson.state = 'IN_SERVICE'
        }
        if (scope.row.state === 'IN_SERVICE') {
          ReqJson.state = 'FINISH'
        }
        await HTTPClient.reservationController.updateState(ReqJson)
        ElMessage.success('操作成功')
        init()
      },
      handleDetail(scope: any, e: Event) {
        e.preventDefault()
        router.push({
          path: '/moduleConfig/reservationDetail',
          query: { id: scope.row.id, orderId: scope.row.orderId }
        })
      }
    }),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, time, ...Rest } = pager.value
  const DateReq = {
    serviceStartDate: '',
    serviceEndDate: '',
    serviceStartTime: '',
    serviceEndTime: ''
  }
  if (time?.length) {
    const [startTime, endTime] = time
    const [_startDate, _startTime] = startTime.split(' ')
    const [_endDate, _endTime] = endTime.split(' ')
    DateReq.serviceStartDate = _startDate
    DateReq.serviceEndDate = _endDate
    DateReq.serviceStartTime = _startTime
    DateReq.serviceEndTime = _endTime
  }
  Object.assign(Rest, DateReq)
  try {
    const { data } = await HTTPClient.reservationController.list(Rest)
    pager.value.total = data.total || 0
    reservationList.value = data.item || []
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
            v-model.trim="pager.orderId"
            placeholder="请输入订单id"
          />
          <ElSelect
            v-model="pager.state"
            clearable
            placeholder="请选择订单状态"
          >
            <ElOption
              v-for="trade in ReservationStateOptions"
              :key="trade.value"
              :value="trade.value"
              :label="trade.label"
            />
          </ElSelect>
          <ElDatePicker
            v-model="pager.time"
            type="datetimerange"
            class="custom-picker"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="YYYY-MM-DD HH:mm:ss"
            clearable
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
:deep(.header .el-date-editor--datetimerange) {
  width: 300px !important;
}
:deep(.el-date-editor.el-input__wrapper) {
  flex-grow: inherit !important;
}
</style>
