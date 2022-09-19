import { watch, onBeforeMount, onBeforeUnmount, onMounted } from "vue";
import { useRoute } from "vue-router";
import { storeToRefs } from 'pinia';
import { useStoreSettings } from "@/store/settings";

export default function (): Store.RefSettings {
  const { body } = document;
  const WIDTH = 992; // refer to Bootstrap's responsive design

  const route = useRoute();
  const storeSettings = useStoreSettings();
  const { setDevice, setOpened, setCollapse } = storeSettings;
  const { device, opened, isCollapse } = storeToRefs(storeSettings);

  watch(()=> route.path, () =>  device.value === "mobile" && setOpened(false));
  
  const $_isMobile = () => body.getBoundingClientRect().width -1 < WIDTH;
  const $_resizeHandler = () => !document.hidden && setDevice($_isMobile() ? "mobile" : "desktop")
  
  onBeforeMount(() => window.addEventListener("resize", $_resizeHandler));
  onMounted($_resizeHandler);

  onBeforeUnmount(() => window.removeEventListener("resize", $_resizeHandler));

  return { device, opened, isCollapse, setOpened, setCollapse }
}