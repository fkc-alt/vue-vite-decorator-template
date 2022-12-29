/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElTable, ElTableColumn } from 'element-plus'

export default function (props: ElTableCustom.TableProps<any>): JSX.Element {
  const { headers, ...attributes } = props
  return (
    <ElTable {...attributes}>
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
