<script lang="ts" setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const toL = ():void => {
    router.push("/login")
}
</script>

<template>
    <div @click="toL">
        dashboard
    </div>
</template>
