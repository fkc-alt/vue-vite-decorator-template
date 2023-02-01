import { OrderModuleFactory } from '@/service/order/order.module'
import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'

export default defineComponent({
  async setup () {
    const ruleForm = useForm()
    const route = useRoute()
    console.log(OrderModuleFactory)
    const state = reactive({}) as Service.OrderDetailReq
    const r = await OrderModuleFactory.OrderController.GetOrderDetail({ orderId: route.query.id as string })
    Object.assign(state, r.data)
    return () => (
      <>
        <CustomForm {...ruleForm} />
        {state.orderId + 'xxxx'}
      </>
    )
  }
})
