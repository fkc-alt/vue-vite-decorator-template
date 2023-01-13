declare namespace CustomerProps {
  declare namespace CustomForm {
    type FormItemRule = import('element-plus').FormItemRule
    interface CustomFormProps {
      formItems: Component[]
      model: Record<string, any>
      rules: Record<string, FormRules>
    }
    interface Component {
      component: Element
      prop: string
      label?: string
      style?: Record<string, any>
      labelWidth?: string | number
      required?: boolean
      rules?: FormItemRule | FormItemRule[]
      error?: string
      showMessage?: boolean
      inlineMessage?: boolean
      size?: 'large' | 'default' | 'small'
      slots?: {
        label: (param: { label: string }) => string
        error: (param: { error: string }) => string
      }
      option?: {
        component: any
        options: any[]
      }
    }
  }
}
