/* eslint-disable @typescript-eslint/no-explicit-any */
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
            }) ?? attributes?.formatter?.(row, column, row[attributes?.prop as string], $index) ?? row[attributes?.prop as string],
            [attributes.prop as string]: (row: ElTableCustom.Cell) => {
              return <slot v-slots={attributes.prop}></slot>
            }
          }}
        </ElTableColumn>
      })}
    </ElTable>
  )
}
