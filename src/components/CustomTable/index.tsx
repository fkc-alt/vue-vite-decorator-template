/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ElTable, ElTableColumn } from 'element-plus'
import { randomKey } from '@/utils'
import { handlerEvents } from './utils'

/**
 * @author kaichao.feng
 * @param { CustomerProps.CustomTable.TableProps<any> } props
 * @returns { JSX.Element }
 * @description ElTable二次封装
 */
export default defineComponent({
  setup (_props, { attrs, emit, expose, slots }) {
    const { column, ...attributes } = attrs as unknown as CustomerProps.CustomTable.TableProps<any>
    const tableRef = ref()
    /**
     * @warning ***因为.vue文件的template模版使用tsx组件修改时不会热更新，所以此处加上key：随机字符串，便于骗过vite热重载进行render切记勿删！！！，以免挠头发 (T⌓T)
     */
    Object.assign(attributes, handlerEvents(attributes), { ref: tableRef })
    expose({ tableRef })
    return () => (
      <ElTable { ...attributes } key={randomKey()}>
        {column.map(attributes => {
          return <ElTableColumn {...attributes}>
            {{
              default: ({ row, column, $index }: CustomerProps.CustomTable.Cell) => slots.default?.({ row, column, $index }) ?? slots[attributes?.prop as string]?.({ row, column, $index }) ?? attributes?.render?.({
                row,
                column,
                $index,
                cellValue: attributes
              }) ?? attributes?.formatter?.(row, column, row[attributes?.prop as string], $index) ?? row[attributes?.prop as string]
            }}
          </ElTableColumn>
        })}
      </ElTable>
    )
  }
})
