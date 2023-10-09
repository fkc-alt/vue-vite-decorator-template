// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Picture } from '@element-plus/icons-vue'
import { ElButton, ElIcon, ElImage, ElPopconfirm } from 'element-plus'
import CustomTable from '@/components/CustomTable'
import DefaultAvatar from '@/assets/defaultAvatar.jpg'
import { Enums } from '~@/typings/enums/product'

export const ShelvesOptions = [
  {
    label: '已上架',
    value: 'Y'
  },
  {
    label: '未上架',
    value: 'N'
  }
]

export const TradeStateOptions = [
  {
    label: '未支付',
    value: 'NOT_PAY',
    color: 'var(--el-color-warning-dark-2)'
  },
  {
    label: '支付成功',
    value: 'PAY_SUCCESS',
    color: 'var(--el-color-success)'
  },
  {
    label: '部分退款',
    value: 'PARTIAL_REFUND',
    color: 'var(--el-color-warning-dark-2)'
  },
  {
    label: '全部退款',
    value: 'FULL_REFUND',
    color: 'var(--el-color-primary-light-5)'
  },
  {
    label: '退款中',
    value: 'TO_BE_REFUND',
    color: 'var(--el-color-error)'
  },
  {
    label: '待收货',
    value: 'TO_BE_RECEIVED',
    color: 'var(--el-color-warning)'
  },
  {
    label: '已关闭',
    value: 'CLOSED',
    color: 'var(--el-color-info)'
  },
  {
    label: '已取消',
    value: 'CANCEL',
    color: 'var(--el-color-info-light-3)'
  }
]

export const ReservationStateOptions = [
  {
    label: '未生效',
    value: 'NOT_IN_EFFECT',
    color: 'var(--el-color-warning-dark-2)'
  },
  {
    label: '待服务',
    value: 'TO_BE_SERVED',
    color: 'var(--el-color-primary-light-5)'
  },
  {
    label: '服务中',
    value: 'IN_SERVICE',
    color: 'var(--el-color-warning-dark-2)'
  },
  {
    label: '已完成',
    value: 'FINISH',
    color: 'var(--el-color-success)'
  },
  {
    label: '已关闭',
    value: 'CLOSED',
    color: 'var(--el-color-info)'
  }
]

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
      prop: 'isShelves',
      label: '上架状态',
      align: 'center',
      minWidth: '150px',
      render(scope) {
        return (
          <span
            style={{
              color:
                scope.row.isShelves === 'N' ? 'red' : 'var(--el-color-primary)'
            }}
          >
            {scope.row.isShelves === 'N' ? '未上架' : '已上架'}
          </span>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      minWidth: '150px',
      render(scope) {
        return (
          <>
            <ElButton
              link
              type="primary"
              onClick={e => param?.handleEdit?.(scope, e)}
            >
              {scope.row.isShelves === 'Y' ? '详情' : '编辑'}
            </ElButton>
            {scope.row.isShelves === 'N' && (
              <ElButton
                link
                type="danger"
                onClick={e => param?.handleDel?.(scope, e)}
              >
                删除
              </ElButton>
            )}
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
      fixed: 'right',
      minWidth: '150px',
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
              data: row.children.map(v => {
                return {
                  ...v,
                  productId: row.productId,
                  isProductShelves: (row as any).isProductShelves
                }
              }),
              border: false,
              rowKey: 'id',
              expandRowKeys: (param as any).expands,
              onExpandChange(row, expandRows) {
                param?.handleChildExpandChange?.(row, expandRows)
              },
              column: spceChildrenColumn(param),
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
      prop: 'isShelves',
      label: '上架状态',
      align: 'center',
      minWidth: '150px',
      render(scope) {
        return (
          <span
            style={{
              color:
                scope.row.isShelves === 'N' ? 'red' : 'var(--el-color-primary)'
            }}
          >
            {scope.row.isShelves === 'N' ? '未上架' : '已上架'}
          </span>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '200px',
      render(scope) {
        return (
          <>
            <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'primary'}
              disabled={scope.row.isProductShelves === 'Y'}
              link
              onClick={e => param?.handleChildAdd?.(scope, e)}
              class="btn"
            >
              添加子规格
            </ElButton>
            {/* <ElPopconfirm
              title={`是否确认${
                scope.row.isShelves === 'Y' ? '下架' : '上架'
              }规格`}
              onConfirm={e => param?.handleChildShelves?.(scope, e)}
            >
              {{
                reference: () => (
                  <ElButton
                    type={
                      scope.row.isProductShelves === 'Y'
                        ? 'info'
                        : scope.row.isShelves === 'Y'
                        ? 'warning'
                        : 'primary'
                    }
                    disabled={scope.row.isProductShelves === 'Y'}
                    link
                    class="btn"
                  >
                    {scope.row.isShelves === 'Y' ? '规格下架' : '规格上架'}
                  </ElButton>
                )
              }}
            </ElPopconfirm> */}
            <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'primary'}
              disabled={scope.row.isProductShelves === 'Y'}
              link
              onClick={e => param?.handleChildEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton>
            <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'danger'}
              disabled={scope.row.isProductShelves === 'Y'}
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
                  productId: row.id,
                  parentSkuId: (row as any)?.skuId ?? '',
                  isProductShelves: row.isShelves
                }
              }),
              border: false,
              rowKey: 'id',
              expandRowKeys: (param as any).expands,
              onExpandChange(row, expandRows) {
                param?.handleChildExpandChange?.(row, expandRows)
              },
              column: spceChildrenColumn({
                handleChildAdd: param?.handleChildAdd as any,
                handleChildEdit: param?.handleChildEdit as any,
                handleChildDel: param?.handleChildDel as any,
                handleChildShelves: param?.handleChildShelves as any,
                handleChildExpandChange: param?.handleChildExpandChange as any,
                expands: param?.expands as any
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
      prop: 'isShelves',
      label: '上架状态',
      align: 'center',
      minWidth: '150px',
      render(scope) {
        return (
          <span
            style={{
              color:
                scope.row.isShelves === 'N' ? 'red' : 'var(--el-color-primary)'
            }}
          >
            {scope.row.isShelves === 'N' ? '未上架' : '已上架'}
          </span>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '120px',
      render(scope) {
        return (
          <>
            <ElButton
              type={scope.row.isShelves === 'Y' ? 'info' : 'primary'}
              link
              disabled={scope.row.isShelves === 'Y'}
              onClick={e => param?.handleAdd?.(scope, e)}
              class="btn"
            >
              添加子规格
            </ElButton>
            {/* <ElPopconfirm
              title={`是否确认${
                scope.row.isShelves === 'Y' ? '下架' : '上架'
              }商品`}
              onConfirm={e => param?.handleShelve?.(scope, e)}
            >
              {{
                reference: () => (
                  <ElButton
                    type={scope.row.isShelves === 'Y' ? 'warning' : 'primary'}
                    link
                    class="btn"
                  >
                    {scope.row.isShelves === 'Y' ? '下架商品' : '上架商品'}
                  </ElButton>
                )
              }}
            </ElPopconfirm> */}
          </>
        )
      }
    }
  ]
}

export const spceShelvesChildrenColumn: CustomerProps.CustomTable.MapColumn<
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
              data: row.children.map(v => {
                return {
                  ...v,
                  productId: row.productId,
                  isProductShelves: (row as any).isProductShelves
                }
              }),
              border: false,
              rowKey: 'id',
              expandRowKeys: (param as any).expands,
              onExpandChange(row, expandRows) {
                param?.handleChildExpandChange?.(row, expandRows)
              },
              column: spceShelvesChildrenColumn(param),
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
      prop: 'isShelves',
      label: '上架状态',
      align: 'center',
      minWidth: '150px',
      render(scope) {
        return (
          <span
            style={{
              color:
                scope.row.isShelves === 'N' ? 'red' : 'var(--el-color-primary)'
            }}
          >
            {scope.row.isShelves === 'N' ? '未上架' : '已上架'}
          </span>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '120px',
      render(scope) {
        return (
          <>
            {/* <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'primary'}
              disabled={scope.row.isProductShelves === 'Y'}
              link
              onClick={e => param?.handleChildAdd?.(scope, e)}
              class="btn"
            >
              添加子规格
            </ElButton> */}
            <ElPopconfirm
              title={`是否确认${
                scope.row.isShelves === 'Y' ? '下架' : '上架'
              }规格`}
              onConfirm={e => param?.handleChildShelves?.(scope, e)}
            >
              {{
                reference: () => (
                  <ElButton
                    type={
                      scope.row.isProductShelves === 'Y'
                        ? 'info'
                        : scope.row.isShelves === 'Y'
                        ? 'warning'
                        : 'primary'
                    }
                    disabled={scope.row.isProductShelves === 'Y'}
                    link
                    class="btn"
                  >
                    {scope.row.isShelves === 'Y' ? '规格下架' : '规格上架'}
                  </ElButton>
                )
              }}
            </ElPopconfirm>
            {/* <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'primary'}
              disabled={scope.row.isProductShelves === 'Y'}
              link
              onClick={e => param?.handleChildEdit?.(scope, e)}
              class="btn"
            >
              编辑
            </ElButton>
            <ElButton
              type={scope.row.isProductShelves === 'Y' ? 'info' : 'danger'}
              disabled={scope.row.isProductShelves === 'Y'}
              link
              onClick={e => param?.handleChildDel?.(scope, e)}
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

export const spceShelvesColumn: CustomerProps.CustomTable.MapColumn<
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
                  productId: row.id,
                  parentSkuId: (row as any)?.skuId ?? '',
                  isProductShelves: row.isShelves
                }
              }),
              border: false,
              rowKey: 'id',
              expandRowKeys: (param as any).expands,
              onExpandChange(row, expandRows) {
                param?.handleChildExpandChange?.(row, expandRows)
              },
              column: spceShelvesChildrenColumn({
                handleChildAdd: param?.handleChildAdd as any,
                handleChildEdit: param?.handleChildEdit as any,
                handleChildDel: param?.handleChildDel as any,
                handleChildShelves: param?.handleChildShelves as any,
                expands: param?.expands as any
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
      prop: 'isShelves',
      label: '上架状态',
      align: 'center',
      minWidth: '150px',
      render(scope) {
        return (
          <span
            style={{
              color:
                scope.row.isShelves === 'N' ? 'red' : 'var(--el-color-primary)'
            }}
          >
            {scope.row.isShelves === 'N' ? '未上架' : '已上架'}
          </span>
        )
      }
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      width: '120px',
      render(scope) {
        return (
          <>
            <ElPopconfirm
              title={`是否确认${
                scope.row.isShelves === 'Y' ? '下架' : '上架'
              }商品`}
              onConfirm={e => param?.handleShelve?.(scope, e)}
            >
              {{
                reference: () => (
                  <ElButton
                    type={scope.row.isShelves === 'Y' ? 'warning' : 'primary'}
                    link
                    class="btn"
                  >
                    {scope.row.isShelves === 'Y' ? '下架商品' : '上架商品'}
                  </ElButton>
                )
              }}
            </ElPopconfirm>
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
      fixed: 'right',
      minWidth: '150px',
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

export const wechatUserColumn: CustomerProps.CustomTable.MapColumn<
  any
> = param => {
  return [
    {
      prop: 'id',
      label: '会员id',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'id',
      label: '会员头像',
      align: 'center',
      width: '200px',
      render(scope) {
        return (
          <ElImage
            class="avatar"
            src={scope.row.avatarUrl || DefaultAvatar}
            fit="cover"
          >
            {{
              error: () => (
                <ElIcon>
                  <Picture />
                </ElIcon>
              )
            }}
          </ElImage>
        )
      }
    },
    {
      prop: 'nickName',
      label: '会员昵称',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'phoneNumber',
      label: '手机号码',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'sex',
      label: '会员性别',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'unionId',
      label: 'unionId',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'openId',
      label: 'openId',
      align: 'center',
      minWidth: '150px'
    }
  ]
}

export const orderColumn: CustomerProps.CustomTable.MapColumn<any> = param => {
  return [
    {
      prop: 'orderId',
      label: '订单id',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'userId',
      label: '会员id',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'payableAmount',
      label: '支付金额',
      align: 'center',
      minWidth: '150px',
      formatter(row) {
        return ((row.payableAmount || 0) / 100).toFixed(2)
      }
    },
    {
      prop: 'tradeState',
      label: '订单状态',
      align: 'center',
      width: '180px',
      render(scope) {
        const status = TradeStateOptions.find(
          v => v.value === scope.row.tradeState
        )!
        return <label style={{ color: status?.color }}>{status?.label}</label>
      }
    },
    {
      prop: 'spOpenid',
      label: '下单openid',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'outTradeNo',
      label: '商户系统订单号',
      align: 'center',
      minWidth: '150px'
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
              type="primary"
              link
              onClick={e => param?.handleDetail?.(scope, e)}
              class="btn"
            >
              详情
            </ElButton>
          </>
        )
      }
    }
  ]
}

export const reservationColumn: CustomerProps.CustomTable.MapColumn<
  any
> = param => {
  return [
    {
      prop: 'orderId',
      label: '订单id',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'dormInfo',
      label: '宿舍信息',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'serviceDate',
      label: '服务日期',
      align: 'center',
      minWidth: '150px',
      formatter(row, column, cellValue, index) {
        return new Date(row.serviceDate).toLocaleString()
      }
    },
    {
      prop: 'serviceTime',
      label: '服务时间',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'state',
      label: '状态',
      align: 'center',
      width: '180px',
      render(scope) {
        const status = ReservationStateOptions.find(
          v => v.value === scope.row.state
        )!
        return <label style={{ color: status.color }}>{status.label}</label>
      }
    },
    {
      prop: 'remark',
      label: '备注',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'custom',
      label: '操作',
      align: 'center',
      fixed: 'right',
      minWidth: '150px',
      render(scope) {
        let btnTitle = ''
        if (scope.row.state === 'TO_BE_SERVED') {
          btnTitle = '开始服务'
        }
        if (scope.row.state === 'IN_SERVICE') {
          btnTitle = '完成服务'
        }
        return (
          <>
            <ElButton
              type="primary"
              link
              onClick={e => param?.handleDetail?.(scope, e)}
              class="btn"
            >
              详情
            </ElButton>
            {['TO_BE_SERVED', 'IN_SERVICE'].includes(scope.row.state) && (
              <ElButton
                type="primary"
                link
                onClick={e => param?.handleUpdate?.(scope, e)}
                class="btn"
              >
                {btnTitle}
              </ElButton>
            )}
          </>
        )
      }
    }
  ]
}

export const orderLogColumn: CustomerProps.CustomTable.MapColumn<
  any
> = param => {
  return [
    {
      prop: 'orderId',
      label: '订单id',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'msg',
      label: '操作信息',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'createAt',
      label: '操作时间',
      align: 'center',
      minWidth: '150px',
      formatter(row, column, cellValue, index) {
        return new Date(row.createAt).toLocaleString()
      }
    }
  ]
}

export const goodsColumn: CustomerProps.CustomTable.MapColumn<any> = param => {
  return [
    {
      prop: 'orderId',
      label: '订单id',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'productName',
      label: '商品名称',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'skuName',
      label: '规格名称',
      align: 'center',
      minWidth: '200px'
    },
    {
      prop: 'quantity',
      label: '数量',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'originalAmount',
      label: '商品价格',
      align: 'center',
      minWidth: '150px'
    },
    {
      prop: 'commodityStatus',
      label: '状态',
      align: 'center',
      minWidth: '150px',
      formatter(row, column, cellValue, index) {
        return row.commodityStatus === 'RETURNED' ? '已退货' : '正常'
      }
    }
  ]
}

export {}
