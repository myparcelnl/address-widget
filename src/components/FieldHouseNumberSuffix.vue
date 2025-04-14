<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">House number suffix <em>(optional)</em></label>
    <BaseTextField
      :id="getFieldName()"
      v-model="houseNumberSuffix"
      :name="getFieldName()"
      length="5"
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

const houseNumberSuffix = defineModel<string>();
const {getFieldName} = useFieldName('houseNumberSuffix');
</script>
