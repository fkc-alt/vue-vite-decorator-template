
<script lang="ts" setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Render from "@/components/Render";
import demo from "@/descriptors/demo";
const router = useRouter();
const toL = ():void => {
    router.push("/login")
}
onMounted(()=>{
    demo.Log<Array<number>>([1, 2, 3])
})
</script>

<template>
    <div @click="toL">
        dashboard
        <Render :props="{name: 'dashboard'}"/>
    </div>  
</template>
