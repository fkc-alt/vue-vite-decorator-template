<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useRoute, useRouter, RouteLocationMatched } from "vue-router";
 // 创建数组
let breadList = ref<RouteLocationMatched[]>([]);
const route = useRoute();
const router = useRouter();

const init = (): void => {
  breadList.value = [];
  route.matched.forEach((item) => {
    if (item.meta.title) {
      breadList.value.push(item);
    }
  });
  if (breadList.value[0]?.name === "Login") breadList.value.shift();
  breadList.value = breadList.value.filter((v) => !v.meta.alwaysShow);
};

const handleLink = (item: RouteLocationMatched) => {
  const { redirect, path } = item;
  router.push(redirect || path);
}

onMounted(init);

watch(() => route.path, init);

</script>

<template>
  <el-breadcrumb separator="/" class="breadcrumb">
      <el-breadcrumb-item v-for="(item, index) in breadList" :key="item.path">
        <span v-if="item.redirect === route.path || index == breadList.length - 1">
            {{ $t(`${item.meta.title}` )}}
        </span>
        <a v-else @click.prevent="handleLink(item)">{{ $t(`${item.meta.title}` )}}</a>
      </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  margin-left: 8px;
  min-width: 100px;
  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
/* breadcrumb transition */
.breadcrumb-enter-active,
.breadcrumb-leave-active {
  transition: all 0.3s;
}

.breadcrumb-enter,
.breadcrumb-leave-active {
  opacity: 0;
  transform: translateX(20px);
}

.breadcrumb-move {
  transition: all 0.3s;
}

.breadcrumb-leave-active {
  position: absolute;
}
</style>
