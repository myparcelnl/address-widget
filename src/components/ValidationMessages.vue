<template>
  <ul
    v-if="validationErrors?.length"
    class="validation-messages">
    <ValidationMessagesItem
      v-for="error in validationErrors"
      :key="error.pointer"
      class="validation-message"
      :error="error" />
  </ul>
</template>

<script setup lang="ts">
import {useAddressData} from '@/composables/useAddressData';
import ValidationMessagesItem from './ValidationMessagesItem.vue';
import {useOrThrow} from '@/utils/useOrThrow';

const {validationErrors} = useOrThrow(useAddressData, 'useAddressData');
</script>
