<template>
  <ul v-if="validationErrors?.length">
    <ValidationMessagesItem
      v-for="error in validationErrors"
      :key="error.pointer"
      :error="error" />
  </ul>
</template>

<script setup lang="ts">
import {useAddressData} from '@/composables/useAddressData';
import ValidationMessagesItem from './ValidationMessagesItem.vue';

const {validationErrors} = useAddressData();
</script>
