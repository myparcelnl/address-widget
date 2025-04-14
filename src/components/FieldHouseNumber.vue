<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">House number</label>
    <BaseTextField
      :id="getFieldName()"
      v-model="houseNumber"
      :name="getFieldName()"
      length="8"
      required
      inputmode="numeric"
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

const houseNumber = defineModel<string>();
const {getFieldName} = useFieldName('houseNumber');
</script>
