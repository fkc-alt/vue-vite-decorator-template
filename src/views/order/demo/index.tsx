import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'
export default defineComponent({
  setup () {
    const ruleForm = useForm()
    return () => (
      <CustomForm {...ruleForm} />
    )
  }
})
