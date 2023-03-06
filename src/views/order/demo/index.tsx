import { OrderModuleFactory } from '@/service/modules/order/order.module'
import CustomForm from '@/components/CustomForm'
import useForm from '../hooks/useForm'
import { ElButton } from 'element-plus'

export default defineComponent({
  async setup () {
    const ruleForm = useForm()
    const route = useRoute()
    const customForm = ref<CustomerProps.CustomForm.FormRef>()
    const state = reactive({}) as Service.OrderDetailReq
    const r = await OrderModuleFactory.orderController.GetOrderDetail({ orderId: route.query.id as string })
    Object.assign(state, r.data)
    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    const valid = async () => {
      // const data = await OrderModuleFactory.orderController.UploadBase64({ file: ruleForm.model.fileList[0], name: '前端' })
      const data = await OrderModuleFactory.orderController.UploadFile({ file: ruleForm.model.fileList[0], name: '前端' })
      console.log(data)
      try {
        await customForm.value?.formRef.validate()
      } catch (error) {
        console.log(error)
      }
    }
    return () => (
      <>
        <CustomForm {...ruleForm} ref={customForm} />
        <ElButton onClick={valid}>validate</ElButton>
      </>
    )
  }
})
