<script setup lang="ts">
useHead({
  titleTemplate: (title: String) => `Discord Profiler - ${title}`,
})
</script>

<template>
  <div>
    <MainNavbar />
    <NuxtPage />
  </div>
</template>
