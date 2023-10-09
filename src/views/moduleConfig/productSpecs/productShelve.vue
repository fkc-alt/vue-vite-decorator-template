<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<script lang="ts" setup>
import { ElMessage } from 'element-plus'
import HTTPClient from '@/main'
import usePager from '@/hooks/usePager'
import { mapValues, useConfig } from '../hooks/useConfig'
import { useSpecForm, modelSpecDefault } from '../hooks/useForm'
import { spceColumn, ShelvesOptions } from '../config'

const ruleForm = useSpecForm()
const { categoryList, groupList, initialConfig } = useConfig()
const refTable = ref<CustomerProps.CustomTable.TableRef>()
const { handlePageChange, handleSizeChange, loading, pager } = usePager({
  name: '',
  categoryId: '',
  groupId: '',
  isShelves: ''
})
const customForm = ref<CustomerProps.CustomForm.FormRef>()
const btnLoading = ref(false)
const currentItem = ref<any>(null)
const [dialogVisible, delDialogVisible] = [ref(false), ref(false)]
const type = ref<'add' | 'update'>('add')
const specList = ref<Service.Product.SpecListItem[]>([])
const productList = ref<any[]>([])
const expands = ref<any[]>([])

const tableProps = computed<
  CustomerProps.CustomTable.TableProps<Service.Product.SpecListItem>
>(() => {
  return {
    rowClassName({ row }) {
      if (row?.children?.length) {
        return ''
      }
      return 'row-expand-cover'
    },
    rowKey: 'id',
    expandRowKeys: expands.value,
    onExpandChange(row, expandRows) {
      if (expandRows.length) {
        expands.value = [row.id]
      } else {
        expands.value = []
      }
    },
    data: specList.value,
    column: spceColumn({
      expands: (expands as any).value,
      handleChildExpandChange(row: any, expandRows: any) {
        // expands.value = Array.from(new Set([...expands.value, row.id]))
        if (expandRows.length) {
          expands.value.push(row.id)
        } else {
          expands.value = expands.value.filter(v => v !== row.id)
        }
        const oldId = expands.value.find(v => row.ids.some((o: any) => o === v))
        if (oldId && row.id !== oldId) {
          expands.value = expands.value.filter(v => v !== oldId)
        }
      },
      handleAdd({ row }, e: Event) {
        e.preventDefault()
        currentItem.value = row
        Object.assign(ruleForm.model, {
          ...modelSpecDefault(),
          productId: row.id
        })
        ;(ruleForm as any).formItems[0].componentProps.disabled = true
        type.value = 'add'
        dialogVisible.value = true
      },
      handleShelve: async ({ row }, e: Event) => {
        e.preventDefault()
        if (row.isShelves === 'Y') {
          await HTTPClient.productController.offShelve({ id: row.id })
          ElMessage.success('操作成功')
          init()
          return
        }
        await HTTPClient.productController.shelve({ id: row.id })
        ElMessage.success('操作成功')
        init()
      },
      handleChildAdd({ row }, e: Event) {
        e.preventDefault()
        if (row?.level === 6) {
          ElMessage.warning('子规格最多只能添加五层')
          return
        }
        currentItem.value = row
        const { parentSkuId, productId, skuId } = row as any
        Object.assign(ruleForm.model, {
          ...modelSpecDefault(),
          productId,
          parentSkuId: skuId || parentSkuId || ''
        })
        ;(ruleForm as any).formItems[0].componentProps.disabled = true
        type.value = 'add'
        dialogVisible.value = true
      },
      handleChildEdit({ row }, e: Event) {
        e.preventDefault()
        currentItem.value = row
        const { originalAmount, ...Rest } = row as any
        const _originalAmount = Number((originalAmount / 100).toFixed(2))
        Object.assign(ruleForm.model, {
          ...Rest,
          originalAmount: _originalAmount
        })
        ;(ruleForm as any).formItems[0].componentProps.disabled = true
        type.value = 'update'
        dialogVisible.value = true
      },
      handleChildDel({ row }, e: Event) {
        e.preventDefault()
        currentItem.value = row
        delDialogVisible.value = true
      },
      handleChildShelves: async ({ row }, e: Event) => {
        e.preventDefault()
        if (row.isShelves === 'Y') {
          await HTTPClient.productSpecController.offShelve({ id: row.id })
          ElMessage.success('操作成功')
          init()
          return
        }
        await HTTPClient.productSpecController.shelve({ id: row.id })
        ElMessage.success('操作成功')
        init()
      }
    }),
    border: false,
    maxHeight: '600px',
    emptyText: '暂无数据'
  }
})
watch(
  () => dialogVisible.value,
  newVal => {
    if (!newVal) {
      Object.assign(ruleForm.model, modelSpecDefault())
    } else {
      customForm.value?.formRef.clearValidate()
    }
  }
)

const afterFn = () => {
  ElMessage.success('操作成功')
  btnLoading.value = false
  dialogVisible.value = false
  delDialogVisible.value = false
  Object.assign(ruleForm.model, modelSpecDefault())
  ;(ruleForm as any).formItems[0].componentProps.disabled = false
  init()
}

const handleAdd = () => {
  type.value = 'add'
  ;(ruleForm as any).formItems[0].componentProps.disabled = false
  dialogVisible.value = true
}
const getProductList = () => {
  HTTPClient.productController
    .list({
      currentPage: 1,
      pageSize: 9999999
    })
    .then(res => {
      productList.value = res.data.item || []
      ruleForm.formItems[0].option!.options = productList.value.map(mapValues)
    })
}
const init = async () => {
  loading.value = true
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { total, ...Rest } = pager.value
  try {
    const { data } = await HTTPClient.productSpecController.list(Rest)
    pager.value.total = data.total || 0
    specList.value = handlerList(data.item || [])
    console.log(specList.value)
  } catch (error) {
  } finally {
    loading.value = false
  }
}

const handlerList = (
  list: any[],
  level?: number,
  parentSkuItem?: Record<string, any>
) => {
  return list.map((v, _, arr): any => {
    return {
      ...v,
      children: v?.children
        ? handlerList(v.children, typeof level !== 'number' ? 1 : level + 1, v)
        : null,
      ids: arr.map(v => v.id),
      level: typeof level !== 'number' ? 1 : level + 1,
      parentSku: parentSkuItem ? parentSkuItem.id : v.id
    }
  })
}

const handleSubmit = () => {
  customForm.value?.formRef.validate(async valid => {
    if (valid) {
      btnLoading.value = true
      const {
        model: {
          productId,
          id,
          specsName,
          originalAmount,
          totalStock,
          shelvesStock,
          parentSkuId,
          sortValue
        }
      } = ruleForm as any
      const ReqJson: any = {
        productId,
        specsName,
        originalAmount: originalAmount * 100,
        totalStock,
        shelvesStock,
        sortValue,
        parentSkuId: parentSkuId || ''
      }
      try {
        if (type.value === 'update') {
          Object.assign(ReqJson, { id })
          await HTTPClient.productSpecController.update(ReqJson)
          afterFn()
          return
        }
        await HTTPClient.productSpecController.add(ReqJson)
        afterFn()
      } catch (error) {
        btnLoading.value = false
      }
    }
  })
}
const handleSubmitDel = async () => {
  btnLoading.value = true
  const { id, ids, parentSku } = currentItem.value
  try {
    if (ids?.length === 1) {
      expands.value = expands.value.filter(v => v !== parentSku)
    }
    await HTTPClient.productSpecController.del({ id })
  } catch (error) {
    btnLoading.value = false
  }
  afterFn()
}

getProductList()
initialConfig()
init()
</script>
<template>
  <div>
    <ElCard>
      <template #header>
        <div class="header">
          <ElInput
            v-model.trim="pager.name"
            placeholder="请输入商品名称"
          />
          <ElSelect
            v-model="pager.categoryId"
            clearable
            placeholder="请选择分类"
          >
            <ElOption
              v-for="category in categoryList"
              :key="category.id"
              :value="category.id"
              :label="category.name"
            />
          </ElSelect>
          <ElSelect
            v-model="pager.groupId"
            clearable
            placeholder="请选择分类"
          >
            <ElOption
              v-for="group in groupList"
              :key="group.id"
              :value="group.id"
              :label="group.name"
            />
          </ElSelect>
          <ElSelect
            v-model="pager.isShelves"
            clearable
            placeholder="请选择"
          >
            <ElOption
              v-for="item in ShelvesOptions"
              :key="item.value"
              :value="item.value"
              :label="item.label"
            />
          </ElSelect>
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
            >添加商品规格</el-button
          >
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
      :title="type === 'add' ? '添加规格' : '编辑规格'"
      width="500px"
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
      title="删除规格"
      width="500px"
    >
      <div>您是否删除当前规格？</div>
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
:deep(.row-expand-cover .cell .el-table__expand-icon) {
  display: none;
}
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
</style>
