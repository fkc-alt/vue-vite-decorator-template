
<script lang="ts" setup>
import { useRouter } from 'vue-router';
import Render from "@/components/Render";
const router = useRouter();
const toL = ():void => {
    router.push("/login")
}

</script>

<template>
    <div @click="toL">
        dashboard
        <!-- <Render :Component="Component"/> -->
    </div>  
</template>
