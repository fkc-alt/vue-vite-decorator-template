/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElTable, ElTableColumn } from 'element-plus'

const handlerMethods = (methods: ElTableCustom.TableEvents): ElTableCustom.TableEvents => {
  const mapMehods = {
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
  return (Object.keys(mapMehods) as unknown as Array<keyof(typeof mapMehods)>).filter(key => mapMehods[key]).reduce((prev, key) => ({ ...prev, [key]: mapMehods[key] }), {})
}

export default function (props: ElTableCustom.TableProps<any>): JSX.Element {
  const { headers, ...attributes } = props
  Object.assign(attributes, handlerMethods(attributes))
  return (
    <ElTable { ...attributes }>
      {headers.map(attributes => {
        return <ElTableColumn {...attributes}>
          {{
            default: ({ row, column, $index }: ElTableCustom.Cell) => attributes?.render?.({
              row,
              column,
              index: $index,
              cellValue: attributes
            }) ?? attributes?.formatter?.(row, column, row[attributes?.prop as string], $index) ?? row[attributes?.prop as string]
          }}
        </ElTableColumn>
      })}
    </ElTable>
  )
}
