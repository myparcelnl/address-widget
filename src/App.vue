<template>
  <TheAddressWidget :config="config" />
</template>

<script setup lang="ts">
import TheAddressWidget from '@/components/TheAddressWidget.vue';
import {useProvideAddressApi} from '@/composables/useAddressApi';
import {useProvideAddressData} from '@/composables/useAddressData';
import {useProvideConfig, type ConfigObject} from '@/composables/useConfig';

defineProps<{
  config?: ConfigObject;
}>();

// Provide global injection states, sharing data between components
useProvideConfig();
useProvideAddressData();
useProvideAddressApi();
</script>

<style>
@import '@/styles/base.css';
</style>
