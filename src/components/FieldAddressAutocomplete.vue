<template>
  <BaseFieldWrapper>
    <label for="searchQuery">Street, Housenumber, City</label>
    <BaseTextField
      id="searchQuery"
      v-model="searchQuery"
      name="searchQuery"
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
const searchQuery = defineModel<string>();
</script>
