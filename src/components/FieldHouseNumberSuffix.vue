<template>
  <BaseFieldWrapper>
    <label for="houseNumberSuffix"
      >House number suffix <em>(optional)</em></label
    >
    <BaseTextField
      id="houseNumberSuffix"
      v-model="houseNumberSuffix"
      name="houseNumberSuffix"
      length="5"
      v-bind="$attrs" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
defineOptions({
  inheritAttrs: false,
});
const houseNumberSuffix = defineModel<string>();
</script>
