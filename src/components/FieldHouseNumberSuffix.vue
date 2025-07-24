<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()"
      >{{ t('label.houseNumberSuffix') }}
      <em>({{ t('label.optional') }})</em></label
    >
    <BaseTextField
      :id="getFieldName()"
      v-model="houseNumberSuffix"
      :name="getFieldName()"
      maxlength="5"
      v-bind="$attrs" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import BaseTextField from '@/components/Base/BaseTextField.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
import {useFieldName} from '@/composables/useFieldName';
import {useTranslation} from '@/composables/useTranslation';

defineOptions({
  inheritAttrs: false,
});

const houseNumberSuffix = defineModel<string>();
const {getFieldName} = useFieldName('houseNumberSuffix');
const {t} = useTranslation();
</script>
