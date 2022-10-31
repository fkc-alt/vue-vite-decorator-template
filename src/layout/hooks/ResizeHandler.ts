import type { Ref } from 'vue'
import { useStoreSettings } from '@/store/settings'

export default function (): Store.Settings<Ref> {
  const { body } = document
  const WIDTH = 992 // refer to Bootstrap's responsive design
  const route = useRoute()
  const storeSettings = useStoreSettings()
  const { setDevice, setOpened, setCollapse } = storeSettings
  const { device, opened, isCollapse } = storeToRefs(storeSettings)

  watch(() => route.path, () => device.value === 'mobile' && setOpened(false))

  const isMobile = (): boolean => body.getBoundingClientRect().width - 1 < WIDTH
  const resizeHandler = (): unknown => !document.hidden && setDevice(isMobile() ? 'mobile' : 'desktop')

  onBeforeMount(() => window.addEventListener('resize', resizeHandler))
  onMounted(resizeHandler)
  onBeforeUnmount(() => window.removeEventListener('resize', resizeHandler))

  return { device, opened, isCollapse, setOpened, setCollapse }
}
