// eslint-disable-next-line @typescript-eslint/no-unused-vars
import CustomTable from '@/components/CustomTable'
import { ElButton } from 'element-plus'
import { Enums } from '~@/typings/enums/product'

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

export const spceChildrenColumn: CustomerProps.CustomTable.MapColumn<
  Service.Product.SpecChildListItem
> = param => {
  return [
    {
      prop: 'children',
      type: 'expand',
      align: 'center',
      render({ row }) {
        if (row.children?.length) {
          const attrs: CustomerProps.CustomTable.TableProps<Service.Product.SpecChildListItem> =
            {
              data: row.children,
              border: false,
              column: spceChildrenColumn(),
              rowClassName({ row }) {
                if (row?.children?.length) {
                  return ''
                }
                return 'row-expand-cover'
              },
              maxHeight: '600px',
              emptyText: '暂无数据'
            }
          return <CustomTable {...attrs} />
        }
        return <></>
      }
    },
    {
      prop: 'skuId',
      label: 'skuID',
      align: 'center',
      minWidth: '120px'
    },
    {
      prop: 'specsName',
      label: '规格名称',
      minWidth: '150px',
      align: 'center'
    },
    {
      prop: 'originalAmount',
      label: '原价',
      align: 'center',
      minWidth: '150px',
      sortable: true,
      formatter(row, column, cellValue, index) {
        // eslint-disable-next-line @typescript-eslint/restrict-plus-operands
        return (row.originalAmount / 100).toFixed(2)
      }
    },
    {
      prop: 'totalStock',
      label: '总库存',
      align: 'center',
      minWidth: '150px',
      sortable: true
    },
    {
      prop: 'shelvesStock',
      label: '上架库存',
      align: 'center',
      minWidth: '150px',
      sortable: true
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '250px',
      render(scope) {
        return (
          <>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleChildAdd?.(scope, e)}
              class="btn"
            >
              添加子规格
            </ElButton>
            {/* <ElButton
              type="primary"
              link
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              上架
            </ElButton>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              下架
            </ElButton> */}
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleChildEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton>
            <ElButton
              type="danger"
              link
              onClick={e => param?.handleChildDel?.(scope, e)}
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

export const spceColumn: CustomerProps.CustomTable.MapColumn<
  Service.Product.SpecListItem
> = param => {
  return [
    {
      prop: 'children',
      type: 'expand',
      align: 'center',
      render({ row }) {
        if (row.children?.length) {
          const attrs: CustomerProps.CustomTable.TableProps<Service.Product.SpecChildListItem> =
            {
              data: row.children.map(v => {
                return {
                  ...v,
                  productId: v.id,
                  parentSkuId: (row as any)?.skuId ?? ''
                }
              }),
              border: false,
              column: spceChildrenColumn({
                handleChildAdd: param?.handleChildAdd as any,
                handleChildEdit: param?.handleChildEdit as any,
                handleChildDel: param?.handleChildDel as any
              }),
              rowClassName({ row }) {
                if (row?.children?.length) {
                  return ''
                }
                return 'row-expand-cover'
              },
              maxHeight: '600px',
              emptyText: '暂无数据'
            }
          return <CustomTable {...attrs} />
        }
        return <></>
      }
    },
    {
      prop: 'name',
      label: '商品名称',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'categoryName',
      label: '分类名称',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'groupName',
      label: '分组名称',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '100px',
      render(scope) {
        return (
          <>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              添加子规格
            </ElButton>
            {/* <ElButton
              type="primary"
              link
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              全部上架
            </ElButton>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              全部下架
            </ElButton> */}
            {/* <ElButton
              type="primary"
              link
              onClick={e => param?.handleEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton> */}
            {/* <ElButton
              type="danger"
              link
              onClick={e => param?.handleDel?.(scope, e)}
              class="btn"
            >
              删除
            </ElButton> */}
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

export const imageTypeRelationKeys: Record<string, any> = {
  [Enums.ImageType.CAROUSEL_IMAGE]: 'carouselFileList',
  [Enums.ImageType.DETAIL_IMAGE]: 'defailFileList',
  [Enums.ImageType.THUMBNAIL]: 'thumbnailFileList'
}

export const parentComponent = (param: any) => {
  return <>123</>
}

export {}
