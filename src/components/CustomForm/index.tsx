import { ElForm, ElFormItem } from 'element-plus'
import type { FormInstance } from 'element-plus'

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
      <ElForm {...attributes} ref={formRef}>
        {formItems.map(attribute => {
          const { component, option, slots, ...attrs } = attribute
          return <ElFormItem {...attrs}>
            {{
              label: (args: { label: string }) => slots?.label(args),
              error: (args: { error: string }) => slots?.error(args),
              default: () => <component v-model={attributes.model[attribute.prop]} {...attrs}>
              {
                option?.options?.map(item => {
                  return <option.component {...item}></option.component>
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
