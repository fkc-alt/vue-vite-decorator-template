import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import { RouterView } from 'vue-router'

export default (): JSX.Element => {
  const language = ref(zhCn)
  return (
    <ElConfigProvider locale={language.value}>
      <RouterView />
    </ElConfigProvider>
  )
}
