import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { RouterView } from 'vue-router'
import { useUserStore } from './store/user'

export default (): JSX.Element => {
  const user = useUserStore()
  const router = useRouter()
  const { token } = storeToRefs(user)
  const language = ref(zhCn)
  watch([token], ([newVal]) => {
    if (!newVal) {
      void router.push('/login')
    }
  })
  return (
    <ElConfigProvider locale={language.value}>
      <RouterView />
    </ElConfigProvider>
  )
}
