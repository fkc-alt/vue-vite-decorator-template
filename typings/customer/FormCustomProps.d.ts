declare namespace CustomerProps {
  declare namespace CustomForm {
    type FormItemRule = import('element-plus').FormItemRule
    type FormInstance = import('element-plus').FormInstance
    type FormItemInstance = import('element-plus').FormItemInstance
    type InputProps = import('element-plus').InputProps & {
      maxlength: string | number
      minlength: number
      rows: number
      name: string
      max: string | number
      min: string | number
      step: string | number
    }
    type SelectProps = InstanceType<typeof import('element-plus').ElSelect>['$props']
    type RadioGroupProps = import('element-plus').RadioGroupProps
    interface FormRef {
      formRef: FormInstance
    }
    interface CustomFormProps extends Partial<FormInstance['$props']> {
      model: Record<string, any>
      formItems: Component[]
      style?: import('vue').CSSProperties
    }
    interface Component extends Partial<FormItemInstance['props']>, FormComponentsEvents {
      prop: string
      component: import('vue').Raw<any> | any
      style?: import('vue').CSSProperties
      slots?: {
        label?: (param: { label: string }) => string
        error?: (param: { error: string }) => string
      }
      option?: {
        style?: import('vue').CSSProperties
        component: import('vue').Raw<any> | any
        options: any[]
      }
      componentProps?: Partial<InputProps | SelectProps | RadioGroupProps & { style: import('vue').CSSProperties }>
    }
    interface FormComponentsEvents {
      events?: {
        onInput?: (args: any) => void
        onFocus?: (args: any) => void
        onBlur?: (args: any) => void
        onChange?: (args: any) => void
        onClear?: (args: any) => void
      }
    }
  }
}
