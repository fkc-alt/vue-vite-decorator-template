import { ElForm, ElFormItem } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'

interface CustomFormProps {
  formItems: Component[]
  model: Record<string, any>
  rules: Record<string, FormRules>
}
interface Component {
  component: Element
  prop: string
  label: string
  style: Record<string, any>
  option: {
    component: any
    options: any[]
  }
}

/**
 * @author kaichao.feng
 * @param { CustomFormProps } props
 * @returns { JSX.Element }
 * @description ElForm二次封装
 */
export default defineComponent({
  setup (props, { attrs, emit, expose, slots }) {
    const { formItems, ...attributes } = attrs as unknown as CustomFormProps
    const formRef = ref<FormInstance>()
    expose({ formRef })
    return () => (
      <ElForm {...attributes} ref={formRef}>
        {formItems.map(attribute => {
          const { component, option, ...attrs } = attribute
          return <ElFormItem {...attrs}>
            {
              <component v-model={attributes.model[attribute.prop]} {...attrs}>
                {
                  option?.options?.map(item => {
                    return <option.component {...item}></option.component>
                  })
                }
              </component>
            }
          </ElFormItem>
        }) }
      </ElForm>
    )
  }
})
