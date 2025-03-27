<template>
  <BaseFieldWrapper>
    <button @click.prevent="emitOverrideRequested">Override address</button>
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import {defineEmits} from 'vue';
import BaseFieldWrapper from './Base/BaseFieldWrapper.vue';

const emit = defineEmits(['override-requested']);

function emitOverrideRequested() {
  emit('override-requested');
}
</script>

<style scoped>
@import 'tailwindcss';

button {
  @apply text-blue-500 bg-slate-100 px-3 py-2;
}
</style>
