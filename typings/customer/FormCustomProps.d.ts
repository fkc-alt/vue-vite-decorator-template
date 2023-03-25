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
    type SelectProps = InstanceType<
      typeof import('element-plus').ElSelect
    >['$props']
    type SelectOptionProps = Readonly<
      import('vue').ExtractPropTypes<{
        value: {
          required: true
          type: Array<
            | BooleanConstructor
            | ObjectConstructor
            | StringConstructor
            | NumberConstructor
          >
        }
        label: Array<StringConstructor | NumberConstructor>
        created: BooleanConstructor
        disabled: {
          type: BooleanConstructor
          default: boolean
        }
      }>
    >
    type RadioGroupProps = import('element-plus').RadioGroupProps
    type RadioProps = import('element-plus').RadioProps
    type CheckboxProps = import('element-plus').CheckboxProps
    type CheckboxGroupProps = import('element-plus').CheckboxGroupProps
    type SwitchProps = import('element-plus').SwitchProps
    type DatePickerProps = InstanceType<
      typeof import('element-plus').ElDatePicker
    >['$props']
    type UploadProps =
      import('element-plus/es/components/upload/src/upload').UploadProps
    interface FormRef {
      formRef: FormInstance
    }
    interface CustomFormProps extends Partial<FormInstance['$props']> {
      model: Record<string, any>
      formItems: Component[]
      style?: import('vue').CSSProperties
    }
    interface Component
      extends Partial<FormItemInstance['props']>,
        FormComponentsEvents {
      prop: string
      component: import('vue').Raw<any> | any
      style?: import('vue').CSSProperties
      slots?: {
        label?: (param: { label: string }) => string
        error?: (param: { error: string }) => string
        file?: (...args: any) => any
        default?: (...args: any) => any
      }
      option?: {
        style?: import('vue').CSSProperties
        component: import('vue').Raw<any> | any
        options: any[]
        componentProps?: Partial<
          SelectOptionProps & { style: import('vue').CSSProperties }
        >
      }
      componentProps?: Partial<
        | InputProps
        | SelectProps
        | RadioGroupProps
        | RadioProps
        | CheckboxGroupProps
        | CheckboxProps
        | SwitchProps
        | DatePickerProps
        | (UploadProps & { style: import('vue').CSSProperties })
      >
    }
    interface FormComponentsEvents {
      events?: {
        onInput?: (args: any) => void
        onFocus?: (args: any) => void
        onBlur?: (args: any) => void
        onChange?: (...args: any) => void
        onClear?: (args: any) => void
      }
    }
    /**
     * @notes TS类型写不动了，这里偷个懒，就先这样吧~😭😭😭😭，后面有时间再补
     */
  }
}
