// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ElButton, ElImage } from 'element-plus'

export const productColumn: CustomerProps.CustomTable.MapColumn<
  Service.Product.ProductListItem
> = param => {
  return [
    {
      prop: 'id',
      label: '商品ID',
      align: 'center'
    },
    {
      prop: 'name',
      label: '商品名称',
      align: 'center'
    },
    {
      prop: 'sortValue',
      label: '排序值',
      align: 'center',
      sortable: true
    },
    {
      prop: 'description',
      label: '商品描述',
      align: 'center'
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      render(scope) {
        return (
          <>
            <ElButton
              link
              type="primary"
              onClick={e => param?.handleEdit?.(scope, e)}
            >
              编辑
            </ElButton>
            <ElButton
              link
              type="danger"
              onClick={e => param?.handleDel?.(scope, e)}
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  ]
}

export const categoryColumn: CustomerProps.CustomTable.MapColumn<
  any
> = param => {
  return [
    {
      prop: 'id',
      label: '分类ID',
      align: 'center'
    },
    {
      prop: 'name',
      label: '分类名称',
      align: 'center'
    },
    {
      prop: 'sortValue',
      label: '排序值',
      align: 'center',
      sortable: true
    },
    {
      prop: 'msg',
      label: '分类描述',
      align: 'center'
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      render(scope) {
        return (
          <>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              link
              onClick={e => param?.handleDel?.(scope, e)}
              class="btn"
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  ]
}

export const groupColumn: CustomerProps.CustomTable.MapColumn<any> = param => {
  return [
    {
      prop: 'id',
      label: '分组ID',
      align: 'center'
    },
    {
      prop: 'name',
      label: '分组名称',
      align: 'center'
    },
    {
      prop: 'sortValue',
      label: '排序值',
      align: 'center',
      sortable: true
    },
    {
      prop: 'description',
      label: '分组描述',
      align: 'center'
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      render(scope) {
        return (
          <>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              link
              onClick={e => param?.handleDel?.(scope, e)}
              class="btn"
            >
              删除
            </ElButton>
          </>
        )
      }
    }
  ]
}

export const swiperColumn: CustomerProps.CustomTable.MapColumn<
  Service.IndexConfig.QuerySwiperConfigItem
> = param => {
  return [
    {
      align: 'center',
      type: 'selection'
    },
    {
      prop: 'id',
      label: 'Id',
      align: 'center'
    },
    {
      prop: 'title',
      label: 'Title',
      align: 'center',
      formatter: (row, column, cellValue, index) => cellValue
    },
    {
      prop: 'description',
      label: 'Description',
      align: 'center'
    }
  ]
}

export {}
