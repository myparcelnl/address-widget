<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">{{ t('label.postalCode') }} </label>
    <BaseTextField
      :id="getFieldName()"
      v-model="postalCode"
      :name="getFieldName()"
      minlength="6"
      maxlength="7"
      required
      inputmode="text"
      pattern="[0-9]{4}\s?[a-zA-Z]{2}"
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

const {getFieldName} = useFieldName('postalCode');
const postalCode = defineModel<string>();
const {t} = useTranslation();
</script>
