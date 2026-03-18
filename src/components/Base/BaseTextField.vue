<template>
  <input
    v-model="model"
    :class="configuration.classNames?.input"
    type="text" />
</template>

<script lang="ts" setup>
import {useConfig} from '@/composables/useConfig';
import {useOrThrow} from '@/utils/useOrThrow';

const model = defineModel<string>();
const {configuration} = useOrThrow(useConfig, 'useConfig');
</script>

<style scoped>
@import 'tailwindcss';

input[disabled] {
  @apply text-gray-500;
  @apply bg-gray-200;
}
input[readonly] {
  @apply bg-gray-100;
}
</style>
