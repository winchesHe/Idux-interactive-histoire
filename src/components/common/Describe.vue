<script setup lang="ts" name="Describe" inheritAttrs="false">
import { isDark } from '@utils/index'
</script>

<template>
  <div class="flex mb flex-col" :class="isDark ? 'dark' : ''">
    <slot class="mb" />
  </div>
</template>

<style scoped>

</style>
