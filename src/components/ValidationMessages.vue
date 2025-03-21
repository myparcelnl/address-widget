<template>
  <ul v-if="validationErrors?.length">
    <ValidationMessageItem
      v-for="error in validationErrors"
      :key="error"
      :error="error">
      {{ error }}
    </ValidationMessageItem>
  </ul>
</template>

<script setup lang="ts">
import {useAddressData} from '@/composables/useAddressData';

const {validationErrors} = useAddressData();
</script>
