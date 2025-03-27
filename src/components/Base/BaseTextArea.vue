<template>
  <textarea v-model="model" />
</template>

<script lang="ts" setup>
const model = defineModel<string>();
</script>

<style scoped>
@import 'tailwindcss';

textarea[disabled] {
  @apply text-gray-500;
  @apply bg-gray-200;
}
textarea[readonly] {
  @apply bg-gray-100;
}
</style>
