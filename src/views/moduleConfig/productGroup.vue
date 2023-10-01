<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import usePager from '@/hooks/usePager'
import { modelGroupDefault, useGroupForm } from './hooks/useForm'
import { groupColumn } from './config'

const { proxy } = getCurrentInstance()!
const ruleForm = useGroupForm()
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const type = ref<'add' | 'update'>('add')
const btnLoading = ref(false)
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  name: ''
})
const [dialogVisible, delDialogVisible] = [ref(false), ref(false)]
const groupList = ref<any[]>([])
const currentItem = ref<any>(null)
watch(
  () => dialogVisible.value,
  newVal => {
    if (!newVal) {
      Object.assign(ruleForm.model, modelGroupDefault())
    } else {
      customForm.value?.formRef.clearValidate()
    }
  }
)
const tableProps = computed<CustomerProps.CustomTable.TableProps<any>>(() => {
  return {
    data: groupList.value,
    column: groupColumn({
      handleEdit: ({ row }, e: Event) => {
        e.preventDefault()
        type.value = 'update'
        Object.assign(ruleForm.model, row)
        dialogVisible.value = true
      },
      handleDel: ({ row }, e: any) => {
        e.preventDefault()
        currentItem.value = row
        delDialogVisible.value = true
      }
    }),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})

const handleAdd = () => {
  type.value = 'add'
  dialogVisible.value = true
}

const afterFn = () => {
  ElMessage.success('操作成功')
  btnLoading.value = false
  dialogVisible.value = false
  delDialogVisible.value = false
  Object.assign(ruleForm.model, modelGroupDefault())
  init()
}

const handleSubmit = () => {
  customForm.value?.formRef.validate(async valid => {
    if (valid) {
      btnLoading.value = true
      const {
        model: { id, name, description, sortValue }
      } = ruleForm as any
      const ReqJson: any = { name, description, sortValue }
      if (type.value === 'update') {
        Object.assign(ReqJson, { id })
        await proxy?.HTTPClient.productGroupController.update(ReqJson)
        afterFn()
        return
      }
      await proxy?.HTTPClient.productGroupController.add(ReqJson)
      afterFn()
    }
  })
}
const handleSubmitDel = async () => {
  btnLoading.value = true
  const { id } = currentItem.value
  await await proxy?.HTTPClient.productGroupController.del({ id })
  afterFn()
}
const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await proxy!.HTTPClient.productGroupController.list(Rest)!
    pager.value.total = (data as any).total || 0
    groupList.value = (data as any).item || []
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
          <div>
            <el-input
              v-model="pager.name"
              placeholder="请输入分组名称"
            />
          </div>
          <div>
            <el-button
              type="primary"
              icon="Search"
              @click="init"
              >查询</el-button
            >
            <el-button
              type="primary"
              icon="Plus"
              @click="handleAdd"
              >添加分组</el-button
            >
          </div>
        </div>
      </template>
      <CustomTable
        ref="refTable"
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
    <ElDialog
      v-model="dialogVisible"
      :title="type === 'add' ? '添加分组' : '编辑分组'"
      width="70%"
    >
      <CustomForm
        v-bind="ruleForm"
        ref="customForm"
      />
      <div class="btn-group">
        <ElButton
          type="primary"
          :loading="btnLoading"
          @click="handleSubmit"
          >确 定</ElButton
        >
        <ElButton @click="dialogVisible = false">取 消</ElButton>
      </div>
    </ElDialog>
    <ElDialog
      v-model="delDialogVisible"
      title="删除分类"
      width="70%"
    >
      <div>您是否删除当前分组？</div>
      <div class="btn-group">
        <ElButton
          type="primary"
          :loading="btnLoading"
          @click="handleSubmitDel"
          >确 定</ElButton
        >
        <ElButton @click="delDialogVisible = false">取 消</ElButton>
      </div>
    </ElDialog>
  </div>
</template>
<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  .el-input {
    width: 300px;
  }
}
.btn-group {
  text-align: right;
}
</style>
