<template>
  <BaseFieldWrapper>
    <label for="postalCode">Postal code</label>
    <BaseTextField
      id="postalCode"
      v-model="postalCode"
      name="postalCode"
      length="4"
      required
      inputmode="numeric"
      v-bind="$attrs" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
defineOptions({
  inheritAttrs: false,
});
const postalCode = defineModel<string>();
</script>
