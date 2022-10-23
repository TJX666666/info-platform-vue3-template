<template>
  <div class="main-box">
    <header-component v-if="notLogin" />
    <router-view v-slot="{ Component, route }">
      <keep-alive>
        <component
          :is="Component"
          :key="route.name"
          :name="route.name"
          v-if="route.meta.keepAlive"
        />
      </keep-alive>
      <component
        :is="Component"
        :key="route.name"
        :name="route.name"
        v-if="!route.meta.keepAlive"
      />
    </router-view>
  </div>
  <bottom-component v-if="notLogin" />
</template>

<script setup lang="ts">
import { useRouter, useRoute } from "vue-router";
const route = useRoute();
const router = useRouter();
//login页面将默认的头部底部给取消掉
let notLogin = ref(true);
watch(
  () => router.currentRoute.value.path,
  (toPath) => {
    //要执行的方法
    if (toPath === "/login") {
      notLogin.value = false;
    }
  },
  { immediate: true, deep: true }
);
</script>

<style  lang="scss" scoped>
.main-box {
  min-height: 100vh;
}
</style>
