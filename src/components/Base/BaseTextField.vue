<template>
  <input
    v-model="model"
    type="text" />
</template>

<script lang="ts" setup>
const model = defineModel<string>();
</script>

<style scoped>
input[disabled] {
  @apply text-gray-500;
  @apply bg-gray-200;
}
input[readonly] {
  @apply bg-gray-100;
}
</style>
