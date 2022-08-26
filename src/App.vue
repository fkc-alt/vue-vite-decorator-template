<script lang="tsx">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  setup(){
    return ():JSX.Element => <router-view />
  }
})
</script>

