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
  /**
   * @description 该参数并不在ElTable的props中定义，如果使用attrs的话,会绑定到根元素上.此处定义props是为了防止此原因
   */
  props: {
    column: Array<Partial<CustomerProps.CustomTable.TableColumnCtx<any>>>
  },
  setup (props, { attrs, emit, expose, slots }) {
    const { column } = toRefs(props)
    const { ...attributes } = attrs as unknown as CustomerProps.CustomTable.TableProps<any>
    const tableRef = ref<InstanceType<typeof import('element-plus').ElTable>>()
    /**
     * @warning ***因为.vue文件的template模版使用tsx组件修改时不会热更新，所以此处加上key：随机字符串，便于骗过vite热重载进行render切记勿删！！！，以免挠头发 (T⌓T)
     */
    Object.assign(handlerEvents(attributes), { ref: tableRef })
    expose({ tableRef })
    return () => (
      <ElTable { ...attributes } key={randomKey()}>
        {column.value?.map(attributes => {
          return <ElTableColumn {...attributes}>
            {{
              default: ({ row, column, $index }: CustomerProps.CustomTable.Cell) => slots.default?.({ row, column, $index }) ?? slots[attributes?.prop as string]?.({ row, column, $index }) ?? attributes?.render?.({
                row,
                column,
                $index,
                cellValue: attributes
              }) ?? attributes?.formatter?.(row, column, row[attributes?.prop as string], $index) ?? row[attributes?.prop as string] ?? ''
            }}
          </ElTableColumn>
        })}
      </ElTable>
    )
  }
})
