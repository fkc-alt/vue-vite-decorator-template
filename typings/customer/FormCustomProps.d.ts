declare namespace CustomerProps {
  declare namespace CustomForm {
    type FormItemRule = import('element-plus').FormItemRule
    interface CustomFormProps {
      formItems: Component[]
      model: Record<string, any>
      rules: import('element-plus').FormRules
    }
    interface Component extends FormComponentsEvents {
      component: import('vue').Raw<any> | any
      prop: string
      label?: string
      placeholder?: string
      style?: import('vue').CSSProperties
      labelWidth?: string | number
      required?: boolean
      rules?: FormItemRule | FormItemRule[]
      error?: string
      showMessage?: boolean
      inlineMessage?: boolean
      size?: 'large' | 'default' | 'small'
      slots?: {
        label?: (param: { label: string }) => string
        error?: (param: { error: string }) => string
      }
      option?: {
        style?: import('vue').CSSProperties
        component: import('vue').Raw<any> | any
        options: any[]
      }
    }
    interface FormComponentsEvents {
      events?: {
        onInput?: (args: any) => void
        onFocus?: (args: any) => void
        onBlur?: (args: any) => void
        onChange?: (args: any) => void
      }
    }
  }
}
