declare namespace CustomerProps {
  declare namespace CustomTable {
    interface TableRef {
      tableRef: InstanceType<typeof import('element-plus').ElTable>
    }
    type TableEvents = import('@/components/CustomTable/utils').TableEvents
    type CSSProperties = import('vue').CSSProperties
    type TableProps<T> = import('element-plus/es/components/table/src/table/defaults').TableProps<T> & TableEvents
    type TableColumnCtx<T> = import('element-plus/es/components/table/src/table-column/defaults').TableColumnCtx<T> & {
      render?: (param: {
        row: T
        column: TableColumnCtx<T>
        cellValue: Partial<TableColumnCtx<T>>
        $index: number
      }) => JSX.Element
    }
    interface CI<T> {
      column: TableColumnCtx<T>
      $index: number
    }
    interface Cell extends CI<any> {
      row: Record<string, any>
    }

    type HandleFunc<T> = ((param: {
      row: T
      column: TableColumnCtx<T>
      cellValue: Partial<TableColumnCtx<T>>
      $index: number
    }, event: Event) => any) | undefined
    type HandlerEvents<T = TableEvents> = (methods: T) => T
    interface SlotProp<T> {
      row: T
      column: TableColumnCtx<T>
      $index: number
    }
    type SlotFunc<T> = ((param: SlotProp<T>) => any) | undefined
    type MapColumn<T> = (param?: Record<string, HandleFunc<T>>) => Array<Partial<TableColumnCtx<T>>>
  }
}
