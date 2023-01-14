import { ElForm, ElFormItem } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { randomKey } from '@/utils'

/**
 * @author kaichao.feng
 * @param { CustomerProps.CustomForm.CustomFormProps } attrs
 * @returns { JSX.Element }
 * @description ElForm二次封装
 */
export default defineComponent({
  setup (props, { attrs, emit, expose, slots }) {
    const { formItems, ...attributes } = attrs as unknown as CustomerProps.CustomForm.CustomFormProps
    const formRef = ref<FormInstance>()
    expose({ formRef })
    return () => (
      <ElForm {...attributes} ref={formRef} key={randomKey()}>
        {formItems.map((attribute, index) => {
          const { component, option, slots, events, ...props } = attribute
          return <ElFormItem {...props}>
            {{
              label: (args: { label: string }) => slots?.label?.(args),
              error: (args: { error: string }) => slots?.error?.(args),
              default: () => <component key={index} {...props} {...events} v-model={attributes.model[attribute.prop]}>
              {
                option?.options?.map(item => {
                  return <option.component {...item}>{ option.component.name === 'ElRadio' ? item.value : item.label }</option.component>
                })
              }
            </component>
            }}
          </ElFormItem>
        }) }
      </ElForm>
    )
  }
})
