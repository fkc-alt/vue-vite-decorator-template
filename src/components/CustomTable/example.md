# TSX组件使用方式
### React版本
```
import { ElTable, ElTableColumn } from 'element-plus'
import { handlerEvents } from './utils'

export default function (props: ElTableCustom.TableProps<any>): JSX.Element {
  const { headers, ...attributes } = props
  Object.assign(attributes, handlerEvents(attributes))
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
```

### Vue3版本
```
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElTable, ElTableColumn } from 'element-plus'
import { handlerEvents } from './utils'

export default defineComponent({
  setup (_props, ctx) {
    const { headers, ...attributes } = ctx.attrs as unknown as ElTableCustom.TableProps<any>
    Object.assign(attributes, handlerEvents(attributes))
    const tableRef = ref()
    ctx.expose({ tableRef })
    return () => (
      <ElTable { ...attributes } ref={tableRef}>
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
})
```