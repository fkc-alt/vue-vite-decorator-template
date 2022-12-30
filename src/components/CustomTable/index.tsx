/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElTable, ElTableColumn } from 'element-plus'
import { handlerEvents } from './utils'

/**
 * @author kaichao.feng
 * @param { CustomerProps.CustomTable.TableProps<any> } props
 * @returns { JSX.Element }
 * @description ElTable二次封装
 */
export default defineComponent({
  setup (_props, ctx) {
    const { headers, ...attributes } = ctx.attrs as unknown as CustomerProps.CustomTable.TableProps<any>
    console.log(ctx.slots)
    Object.assign(attributes, handlerEvents(attributes))
    const tableRef = ref()
    ctx.expose({ tableRef })
    return () => (
      <ElTable { ...attributes } ref={tableRef}>
        {headers.map(attributes => {
          return <ElTableColumn {...attributes}>
            {{
              default: ({ row, column, $index }: CustomerProps.CustomTable.Cell) => ctx.slots.default?.({ row, column, $index }) ?? ctx.slots[attributes?.prop as string]?.({ row, column, $index }) ?? attributes?.render?.({
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
