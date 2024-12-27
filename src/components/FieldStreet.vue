<template>
  <BaseFieldWrapper>
    <label for="street">Street</label>
    <BaseTextField
      id="street"
      v-model="street"
      name="street"
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
const street = defineModel<string>();
</script>
