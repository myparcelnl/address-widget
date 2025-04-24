<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">Postal code</label>
    <BaseTextField
      :id="getFieldName()"
      v-model="postalCode"
      :name="getFieldName()"
      length="4"
      required
      inputmode="numeric"
      pattern="[0-9]{4}\s?[a-zA-Z]{2}"
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

const {getFieldName} = useFieldName('postalCode');
const postalCode = defineModel<string>();
</script>
