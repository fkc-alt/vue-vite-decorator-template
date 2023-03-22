declare type MapEventKeys = keyof (typeof mapEventKeys)
declare type MapEventValues = typeof mapEventKeys[keyof (typeof mapEventKeys)]
export declare type TableEvents = Partial<Record<MapEventKeys | MapEventValues, ((...args: any[]) => any) | undefined>>
declare const mapEventKeys: {
  readonly onExpandChange: 'onExpand-change'
  readonly onCurrentChange: 'onCurrent-change'
  readonly onSelectAll: 'onSelect-all'
  readonly onSelectionChange: 'onSelection-change'
  readonly onCellMouseEnter: 'onCell-mouse-enter'
  readonly onCellMouseLeave: 'onCell-mouse-leave'
  readonly onCellContextmenu: 'onCell-contextmenu'
  readonly onCellClick: 'onCell-click'
  readonly onCellDblclick: 'onCell-dblclick'
  readonly onRowClick: 'onRow-click'
  readonly onRowContextmenu: 'onRow-contextmenu'
  readonly onRowDblclick: 'onRow-dblclick'
  readonly onHeaderClick: 'onHeader-click'
  readonly onHeaderContextmenu: 'onHeader-contextmenu'
  readonly onSortChange: 'onSort-change'
  readonly onFilterChange: 'onFilter-change'
  readonly onHeaderDragend: 'onHeader-dragend'
}
export declare const handlerEvents: CustomerProps.CustomTable.HandlerEvents
export {}
