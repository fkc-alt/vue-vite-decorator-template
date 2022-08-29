<script lang="tsx">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup: (props, ctx) => ():JSX.Element => <router-view />
})
</script>

