<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">Street</label>
    <BaseTextField
      :id="getFieldName()"
      v-model="street"
      :name="getFieldName()"
      required
      v-bind="$attrs" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
import {useFieldName} from '@/composables/useFieldName';

defineOptions({
  inheritAttrs: false,
});
const street = defineModel<string>();
const {getFieldName} = useFieldName('street');
</script>
