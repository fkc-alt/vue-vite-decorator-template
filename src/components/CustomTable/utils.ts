export const handlerEvents: CustomerProps.CustomTable.HandlerEvents = methods => {
  const mapEvents = {
    onSelect: methods.onSelect,
    'onExpand-change': methods.onExpandChange ?? methods['onExpand-change'],
    'onCurrent-change': methods.onCurrentChange ?? methods['onCurrent-change'],
    'onSelect-all': methods.onSelectAll ?? methods['onSelect-all'],
    'onSelection-change': methods.onSelectionChange ?? methods['onSelection-change'],
    'onCell-mouse-enter': methods.onCellMouseEnter ?? methods['onCell-mouse-enter'],
    'onCell-mouse-leave': methods.onCellMouseLeave ?? methods['onCell-mouse-leave'],
    'onCell-contextmenu': methods.onCellContextmenu ?? methods['onCell-contextmenu'],
    'onCell-click': methods.onCellClick ?? methods['onCell-click'],
    'onCell-dblclick': methods.onCellDblclick ?? methods['onCell-dblclick'],
    'onRow-click': methods.onRowClick ?? methods['onRow-click'],
    'onRow-contextmenu': methods.onRowContextmenu ?? methods['onRow-contextmenu'],
    'onRow-dblclick': methods.onRowDblclick ?? methods['onRow-dblclick'],
    'onHeader-click': methods.onHeaderClick ?? methods['onHeader-click'],
    'onHeader-contextmenu': methods.onHeaderContextmenu ?? methods['onHeader-contextmenu'],
    'onSort-change': methods.onSortChange ?? methods['onSort-change'],
    'onFilter-change': methods.onFilterChange ?? methods['onFilter-change'],
    'onHeader-dragend': methods.onHeaderDragend ?? methods['onHeader-dragend']
  }
  return (Object.keys(mapEvents) as unknown as Array<keyof(typeof mapEvents)>).filter(key => mapEvents[key]).reduce((prev, key) => ({ ...prev, [key]: mapEvents[key] }), {})
}
