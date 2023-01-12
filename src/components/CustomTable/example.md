# TSX组件使用方式
### React版本
```
import { ElTable, ElTableColumn } from 'element-plus'
import { handlerEvents } from './utils'

export default function (props: ElTableCustom.TableProps<any>): JSX.Element {
  const { headers, slots, ...attributes } = props
  Object.assign(attributes, handlerEvents(attributes))
  return (
    <ElTable { ...attributes }>
      {headers.map(attributes => {
        return <ElTableColumn {...attributes}>
          {{
            default: ({ row, column, $index }: ElTableCustom.Cell) => slots.default?.({ row, column, $index }) ?? slots[attributes?.prop as string]?.({ row, column, $index }) ?? attributes?.render?.({
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
```

### Vue3版本
```
import { ElTable, ElTableColumn } from 'element-plus'
import { handlerEvents } from './utils'

export default defineComponent({
  setup (_props, { attrs, emit, expose, slots }) {
    const { headers, ...attributes } = attrs as unknown as CustomerProps.CustomTable.TableProps<any>
    Object.assign(attributes, handlerEvents(attributes))
    const tableRef = ref()
    expose({ tableRef })
    return () => (
      <ElTable { ...attributes } ref={tableRef}>
        {headers.map(attributes => {
          return <ElTableColumn {...attributes}>
            {{
              default: ({ row, column, $index }: CustomerProps.CustomTable.Cell) => slots.default?.({ row, column, $index }) ?? slots[attributes?.prop as string]?.({ row, column, $index }) ?? attributes?.render?.({
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
})
```