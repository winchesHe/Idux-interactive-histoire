<script setup lang="ts">
import { isDark } from '@/theme/darkMode'
</script>

<template>
  <div class="flex mb flex-col" :class="isDark ? 'dark' : ''">
    <slot class="mb" />
  </div>
</template>

<style scoped>

</style>
