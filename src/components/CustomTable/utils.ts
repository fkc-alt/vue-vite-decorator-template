export const handlerEvents: CustomerProps.CustomTable.HandlerEvents = methods => {
  type MapEventKeys = keyof(typeof mapEventKeys)
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
  }
  for (const key in methods) {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (mapEventKeys[key as MapEventKeys]) {
      methods[mapEventKeys[key as MapEventKeys] as MapEventKeys] = methods[key as MapEventKeys]
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete methods[key as MapEventKeys]
    }
  }
  return methods
}
