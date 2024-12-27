<template>
  <BaseFieldWrapper>
    <label for="houseNumber">House number</label>
    <BaseTextField
      id="houseNumber"
      v-model="houseNumber"
      name="houseNumber"
      length="8"
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
const houseNumber = defineModel<string>();
</script>
