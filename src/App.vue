<template>
  <header-component />
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
  <bottom-component />
</template>

<script setup lang="ts">
</script>

<style scoped>
</style>
