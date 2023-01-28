declare namespace CustomerProps {
  declare namespace CustomTable {
    interface TableRef {
      tableRef: InstanceType<typeof import('element-plus').ElTable>
    }
    type TableEvents = import('@/components/CustomTable/utils').TableEvents
    type CSSProperties = import('vue').CSSProperties
    type TableProps<T> = import('element-plus/es/components/table/src/table/defaults').TableProps<T> & TableEvents
    type TableColumnCtx<T> = import('element-plus/es/components/table/src/table-column/defaults').TableColumnCtx<T> & {
      render?: (param: TableColumnParameters<T>) => JSX.Element
    }
    interface TableColumnParameters<T> {
      row: T
      column: TableColumnCtx<T>
      cellValue: Partial<TableColumnCtx<T>>
      $index: number
    }
    type DefaultParameters = Omit<CustomerProps.CustomTable.TableColumnParameters<Record<string, any>>, 'cellValue'>
    type HandleFunc<T> = ((param: TableColumnParameters<T>, event: Event) => any) | undefined
    type HandlerEvents<T = TableEvents> = (methods: T) => T
    type SlotFunc<T> = ((param: SlotProp<T>) => any) | undefined
    type MapColumn<T> = (param?: Record<string, HandleFunc<T>>) => Array<Partial<TableColumnCtx<T>>>
    interface SlotProp<T> extends Omit<TableColumnParameters<T>, 'cellValue'> { }
  }
}
