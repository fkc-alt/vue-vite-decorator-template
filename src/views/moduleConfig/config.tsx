import { ElButton, ElImage } from 'element-plus'

export const productColumn: CustomerProps.CustomTable.MapColumn<
  Service.IndexConfig.QuerySwiperConfigItem
> = param => {
  return [
    {
      prop: 'id',
      label: '商品编号',
      align: 'center'
    },
    {
      prop: 'name',
      label: '商品名称',
      align: 'center'
    },
    {
      prop: 'description',
      label: '商品简介',
      align: 'center'
    },
    {
      prop: 'value',
      label: '商品图片',
      align: 'center',
      render({ row }) {
        return (
          <ElImage
            style="width: 100px; height: 100px"
            src={row.image}
            previewSrcList={[row.image]}
            fit="cover"
          />
        )
      }
    },
    {
      prop: 'stock',
      label: '商品库存',
      align: 'center'
    },
    {
      prop: 'price',
      label: '商品售价',
      align: 'center'
    },
    {
      prop: 'price',
      label: '上架状态',
      align: 'center',
      render({ row }) {
        return (
          <>
            {row.sort === 0 && (
              <span style={{ color: row.sort === 0 ? 'green' : 'red' }}>
                {row.sort === 0 ? '销售中' : '已下架'}
              </span>
            )}
          </>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      render({ row }) {
        return <ElButton>下架</ElButton>
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
