type MapEventKeys = keyof(typeof mapEventKeys)
type MapEventValues = typeof mapEventKeys[keyof(typeof mapEventKeys)]
export type TableEvents = Partial<Record<MapEventValues, ((...args: any[]) => any) | undefined> & Record<MapEventKeys, ((...args: any[]) => any) | undefined>>

const mapEventKeys = {
  onExpandChange: 'onExpand-change',
  onCurrentChange: 'onCurrent-change',
  onSelectAll: 'onSelect-all',
  onSelectionChange: 'onSelection-change',
  onCellMouseEnter: 'onCell-mouse-enter',
  onCellMouseLeave: 'onCell-mouse-leave',
  onCellContextmenu: 'onCell-contextmenu',
  onCellClick: 'onCell-click',
  onCellDblclick: 'onCell-dblclick',
  onRowClick: 'onRow-click',
  onRowContextmenu: 'onRow-contextmenu',
  onRowDblclick: 'onRow-dblclick',
  onHeaderClick: 'onHeader-click',
  onHeaderContextmenu: 'onHeader-contextmenu',
  onSortChange: 'onSort-change',
  onFilterChange: 'onFilter-change',
  onHeaderDragend: 'onHeader-dragend'
} as const

export const handlerEvents: CustomerProps.CustomTable.HandlerEvents = methods => {
  for (const key in methods) {
    if (mapEventKeys[key as MapEventKeys & MapEventValues]) {
      methods[mapEventKeys[key as MapEventKeys & MapEventValues]] = methods[key as MapEventKeys & MapEventValues]
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete methods[key as MapEventKeys & MapEventValues]
    }
  }
  return methods
}
