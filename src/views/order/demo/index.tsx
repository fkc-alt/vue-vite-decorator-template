import OrderModel from '@/apis/modules/order'
import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'
export default defineComponent({
  async setup () {
    const ruleForm = useForm()
    const route = useRoute()
    const state = reactive({}) as Service.OrderDetailRes
    const r = await OrderModel.GetOrderDetail({ orderId: route.query.id as string })
    Object.assign(state, r.data)
    return () => (
      <CustomForm {...ruleForm} />
    )
  }
})
