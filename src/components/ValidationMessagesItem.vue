<template>
  <li class="text-red-500">
    <slot>
      {{ error.detail }}
    </slot>
  </li>
</template>

<script setup lang="ts">
import type {ValidationErrors} from '@/composables/useAddressData';

defineProps<{
  error: ValidationErrors[number];
}>();
</script>
