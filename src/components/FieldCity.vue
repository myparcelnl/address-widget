<template>
  <BaseFieldWrapper>
    <label for="city">City</label>
    <BaseTextField
      id="city"
      v-model="city"
      name="city"
      required
      v-bind="$attrs" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
defineOptions({
  inheritAttrs: false,
});
const city = defineModel<string>();
</script>
