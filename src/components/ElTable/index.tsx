import { VNode } from 'vue'
import { ElTable, ElTableColumn } from 'element-plus'
import { FilterMethods, Filters } from 'element-plus/es/components/table/src/table-column/defaults'

export interface CI<T> {
  column: TableColumnCtx<T>
  $index: number
}

export interface Cell extends CI<unknown> {
  row: Record<string, unknown>
}

export interface TableColumnCtx<T> {
  id: string
  realWidth: number
  type: string
  label: string
  className: string
  labelClassName: string
  property: string
  prop: string
  width: string | number
  minWidth: string | number
  renderHeader: (data: CI<T>) => VNode
  sortable: boolean | string
  sortMethod: (a: T, b: T) => number
  sortBy: string | ((row: T, index: number) => string) | string[]
  resizable: boolean
  columnKey: string
  rawColumnKey: string
  align: string
  headerAlign: string
  showTooltipWhenOverflow: boolean
  showOverflowTooltip: boolean
  fixed: boolean | string
  formatter: (row: T, column: TableColumnCtx<T>, cellValue: unknown, index: number) => VNode | string
  selectable: (row: T, index: number) => boolean
  reserveSelection: boolean
  filterMethod: FilterMethods<T>
  filteredValue: string[]
  filters: Filters
  filterPlacement: string
  filterMultiple: boolean
  index: number | ((index: number) => number)
  sortOrders: Array<'ascending' | 'descending' | null>
  renderCell: (data: unknown) => void
  colSpan: number
  rowSpan: number
  children: Array<TableColumnCtx<T>>
  level: number
  filterable: boolean | FilterMethods<T> | Filters
  order: string
  isColumnGroup: boolean
  isSubColumn: boolean
  columns: Array<TableColumnCtx<T>>
  getColumnIndex: () => number
  no: number
  filterOpened?: boolean
  render?: (row: T, column: TableColumnCtx<T>, cellValue: unknown, index: number) => JSX.Element
}

export const Table = (props: InstanceType<typeof ElTable> & { headers: Array<TableColumnCtx<unknown>> }): JSX.Element => {
  return (
    <ElTable {...props}>
      { props.headers.map(v => {
        return <ElTableColumn { ...v }>
          {{
            default: ({ row, column, $index }: Cell) => v?.render?.(row, column, '', $index) ?? v?.formatter?.(row, column, '', $index) ?? row[v.prop]
          }}
        </ElTableColumn>
      }) }
    </ElTable>
  )
}

export { }
