<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">{{ t('label.city') }}</label>
    <BaseTextField
      :id="getFieldName()"
      v-model="city"
      :name="getFieldName()"
      required
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

const city = defineModel<string>();
const {getFieldName} = useFieldName('city');
const {t} = useTranslation();
</script>
