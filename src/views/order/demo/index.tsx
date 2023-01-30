import ServiceModule from '@/apis'
import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'

export default defineComponent({
  async setup () {
    const ruleForm = useForm()
    const route = useRoute()
    const state = reactive({}) as Service.OrderDetailRes
    const r = await ServiceModule.order.GetOrderDetail({ orderId: route.query.id as string })
    Object.assign(state, r.data)
    return () => (
      <CustomForm {...ruleForm} />
    )
  }
})
