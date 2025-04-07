<template>
  <TheAddressWidget />
</template>

<script setup lang="ts">
import TheAddressWidget from '@/components/TheAddressWidget.vue';
import {useProvideAddressApi} from '@/composables/useAddressApi';
import {useProvideConfig, useProvideAddressData} from '@/main';
// Provide global injection states, sharing data between components
useProvideConfig();
useProvideAddressData();
useProvideAddressApi();
</script>

<style>
@import '@/styles/base.css';
</style>
