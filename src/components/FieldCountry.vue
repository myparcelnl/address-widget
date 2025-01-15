<template>
  <BaseFieldWrapper>
    <label for="country">Country</label>
    <BaseSelect
      v-model="country"
      name="country"
      :options="countryOptions"
      required
      v-bind="$attrs"></BaseSelect>
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import {computed} from 'vue';
import BaseSelect from '@/components/Base/BaseSelect.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
import type {Alpha2CountryCode} from '@/api-client';
defineOptions({
  inheritAttrs: false,
});
const country = defineModel<Alpha2CountryCode | null>();

// Defines a prop that lists all allowed countries, if none are given, all countries are allowed
type countryObject = {
  code: Alpha2CountryCode;
  label: string;
};
// TODO: Use myparcel validator to check if the CC is correct
const props = defineProps<{
  allowedCountries?: countryObject[];
}>();
// All the options which are possible. Used if no allowedCountries are given
const availableCountries: countryObject[] = [
  {code: 'NL', label: 'Netherlands'},
  {code: 'BE', label: 'Belgium'},
];

const countryOptions = computed(() =>
  props.allowedCountries?.length
    ? props.allowedCountries.map((country) => ({
        value: country.code,
        label: country.label,
      }))
    : availableCountries.map((country) => ({
        value: country.code,
        label: country.label,
      })),
);
</script>
