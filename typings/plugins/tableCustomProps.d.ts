/* eslint-disable @typescript-eslint/no-explicit-any */

declare namespace ElTableCustom {
    type Layout = 'fixed' | 'auto'
    type CSSProperties = import('vue').CSSProperties
    type VNode = import('vue').VNode
    type ColumnCls<T> = import('element-plus').ColumnCls<T>
    type ColumnStyle<T> = import('element-plus').ColumnStyle<T>
    type Sort = import('element-plus').Sort
    type SorSummaryMethodt<T> = import('element-plus').SummaryMethod<T>
    type Table<T> = import('element-plus').Table<T>
    type TreeNode = import('element-plus').TreeNode
    type FilterMethods<T> = import('element-plus/es/components/table/src/table-column/defaults').FilterMethods<T>
    type Filters = import('element-plus/es/components/table/src/table-column/defaults').Filters
    type CellCls<T> = string | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => string)
    type CellStyle<T> = CSSProperties | ((data: {
      row: T
      rowIndex: number
      column: TableColumnCtx<T>
      columnIndex: number
    }) => CSSProperties)

    interface CI<T> {
      column: TableColumnCtx<T>
      $index: number
    }

    interface Cell extends CI<unknown> {
      row: Record<string, string>
    }

    interface TableProps<T> extends TableEvents {
      data: T[]
      headers: Array<Partial<Headers<any>>>
      size?: string
      width?: string | number
      height?: string | number
      maxHeight?: string | number
      fit?: boolean
      stripe?: boolean
      border?: boolean
      rowKey?: string | ((row: T) => string)
      context?: Table<T>
      showHeader?: boolean
      showSummary?: boolean
      sumText?: string
      summaryMethod?: SummaryMethod<T>
      rowClassName?: ColumnCls<T>
      rowStyle?: ColumnStyle<T>
      cellClassName?: CellCls<T>
      cellStyle?: CellStyle<T>
      headerRowClassName?: ColumnCls<T>
      headerRowStyle?: ColumnStyle<T>
      headerCellClassName?: CellCls<T>
      headerCellStyle?: CellStyle<T>
      highlightCurrentRow?: boolean
      currentRowKey?: string | number
      emptyText?: string
      expandRowKeys?: any[]
      defaultExpandAll?: boolean
      defaultSort?: Sort
      tooltipEffect?: string
      spanMethod?: (data: {
        row: T
        rowIndex: number
        column: TableColumnCtx<T>
        columnIndex: number
      }) => number[] | {
        rowspan: number
        colspan: number
      } | undefined
      selectOnIndeterminate?: boolean
      indent?: number
      treeProps?: {
        hasChildren?: string
        children?: string
      }
      lazy?: boolean
      load?: (row: T, treeNode: TreeNode, resolve: (data: T[]) => void) => void
      className?: string
      style?: CSSProperties
      tableLayout?: Layout
      flexible?: boolean
    }

    interface TableEvents {
      onSelect?: ((...args: any[]) => any) | undefined
      onExpandChange?: ((...args: any[]) => any) | undefined
      onCurrentChange?: ((...args: any[]) => any) | undefined
      onSelectAll?: ((...args: any[]) => any) | undefined
      onSelectionChange?: ((...args: any[]) => any) | undefined
      onCellMouseEnter?: ((...args: any[]) => any) | undefined
      onCellMouseLeave?: ((...args: any[]) => any) | undefined
      onCellContextmenu?: ((...args: any[]) => any) | undefined
      onCellClick?: ((...args: any[]) => any) | undefined
      onCellDblclick?: ((...args: any[]) => any) | undefined
      onRowClick?: ((...args: any[]) => any) | undefined
      onRowContextmenu?: ((...args: any[]) => any) | undefined
      onRowDblclick?: ((...args: any[]) => any) | undefined
      onHeaderClick?: ((...args: any[]) => any) | undefined
      onHeaderContextmenu?: ((...args: any[]) => any) | undefined
      onSortChange?: ((...args: any[]) => any) | undefined
      onFilterChange?: ((...args: any[]) => any) | undefined
      onHeaderDragend?: ((...args: any[]) => any) | undefined
      'onExpand-change'?: ((...args: any[]) => any) | undefined
      'onCurrent-change'?: ((...args: any[]) => any) | undefined
      'onSelect-all'?: ((...args: any[]) => any) | undefined
      'onSelection-change'?: ((...args: any[]) => any) | undefined
      'onCell-mouse-enter'?: ((...args: any[]) => any) | undefined
      'onCell-mouse-leave'?: ((...args: any[]) => any) | undefined
      'onCell-contextmenu'?: ((...args: any[]) => any) | undefined
      'onCell-click'?: ((...args: any[]) => any) | undefined
      'onCell-dblclick'?: ((...args: any[]) => any) | undefined
      'onRow-click'?: ((...args: any[]) => any) | undefined
      'onRow-contextmenu'?: ((...args: any[]) => any) | undefined
      'onRow-dblclick'?: ((...args: any[]) => any) | undefined
      'onHeader-click'?: ((...args: any[]) => any) | undefined
      'onHeader-contextmenu'?: ((...args: any[]) => any) | undefined
      'onSort-change'?: ((...args: any[]) => any) | undefined
      'onFilter-change'?: ((...args: any[]) => any) | undefined
      'onHeader-dragend'?: ((...args: any[]) => any) | undefined
    }
    interface TableColumnCtx<T> {
      id: string
      realWidth: number
      type: string
      label: string
      className: string
      rowClassName?: ColumnCls<T>
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
      formatter: (row: T, column: TableColumnCtx<T>, cellValue: string, index: number) => VNode | string
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
      render?: (param: {
        row: T
        column: TableColumnCtx<T>
        cellValue: Partial<Headers<T>>
        index: number
      }) => JSX.Element
    }

    type HandleFunc<T> = ((param: {
      row: T
      column: TableColumnCtx<T>
      cellValue: Partial<Headers<T>>
      index: number
    }) => any) | undefined
    type HandlerEvents<T = TableEvents> = (methods: T) => T
    type Headers<T> = Pick<TableColumnCtx<T>, 'id' | 'align' | 'className' | 'type' | 'index' | 'label' | 'columnKey' | 'prop' | 'width' | 'minWidth' | 'fixed' | 'renderHeader' | 'sortable' | 'sortMethod' | 'sortBy' | 'sortOrders' | 'resizable' | 'formatter' | 'showOverflowTooltip' | 'headerAlign' | 'labelClassName' | 'selectable' | 'reserveSelection' | 'filters' | 'filterPlacement' | 'filterMultiple' | 'filterMethod' | 'filteredValue' | 'render' | 'rowClassName'>
    type MapHeaders<T> = (param?: Record<string, ElTableCustom.HandleFunc<T>>) => Array<Partial<ElTableCustom.Headers<T>>>
}
