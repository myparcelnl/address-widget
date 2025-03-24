<template>
  <template v-if="countryCode === 'NL'">
    <ValidationMessages />

    <FieldPostalCode
      v-model="postalCode"
      @input.stop="handlePostalCodeInput"></FieldPostalCode>
    <FieldHouseNumber
      v-model="houseNumber"
      @input.stop="handlePostalCodeInput"></FieldHouseNumber>
    <FieldHouseNumberSuffix
      v-model="houseNumberSuffix"
      @input.stop="handlePostalCodeInput"></FieldHouseNumberSuffix>

    <template v-if="addressResults && addressResults?.length > 1 && !loading">
      <FieldAddressSelect
        :addresses="addressResults"
        @address-select="selectAddress"></FieldAddressSelect>
    </template>

    <template v-if="isReadyForPostalCodeLookup">
      <FieldStreet
        v-model="street"
        :readonly="!isOverrideActive"
        :disabled="loading"
        :placeholder="loading ? '...' : ''"
        @input.stop="handleOverrideInput"></FieldStreet>

      <FieldCity
        v-model="city"
        :readonly="!isOverrideActive"
        :disabled="loading"
        :placeholder="loading ? '...' : ''"
        @input.stop="handleOverrideInput"></FieldCity>

      <ButtonOverride
        v-if="!loading && !isOverrideActive"
        @override-requested="isOverrideActive = true"></ButtonOverride>
    </template>
  </template>
</template>

<script setup lang="ts">
import {toValue, watch} from 'vue';

import FieldAddressSelect from '@/components/FieldAddressSelect.vue';
import FieldPostalCode from '@/components/FieldPostalCode.vue';
import FieldHouseNumber from '@/components/FieldHouseNumber.vue';
import FieldHouseNumberSuffix from '@/components/FieldHouseNumberSuffix.vue';
import FieldStreet from '@/components/FieldStreet.vue';
import FieldCity from '@/components/FieldCity.vue';
import ButtonOverride from '@/components/ButtonOverride.vue';
import ValidationMessages from './ValidationMessages.vue';

import {useAddressApi} from '@/composables/useAdressApi';
import {
  type AddressSelectedEvent,
  useAddressData,
} from '@/composables/useAddressData';

import {useHandleUserInput} from '@/composables/useHandleUserInput';
import {useConfig} from '@/composables/useConfig';
import type {ConfigObject} from '@/composables/useConfig';

const props = defineProps<{
  config?: ConfigObject;
}>();

const emit = defineEmits<AddressSelectedEvent>();

const {handlePostalCodeInput, handleOverrideInput, isOverrideActive} =
  useHandleUserInput(emit);

const {
  validationErrors,
  countryCode,
  postalCode,
  houseNumber,
  houseNumberSuffix,
  street,
  city,
  selectedAddress,
  selectAddress,
  isReadyForPostalCodeLookup,
} = useAddressData(emit);

const {addressResults, loading} = useAddressApi();

/**
 * Set config whenever it changes
 */
const {setConfig} = useConfig();
watch(
  () => props.config,
  (config) => {
    if (!config) return;
    setConfig(config);
  },
  {immediate: true},
);

/**
 * Handle UI updates when API results change.
 */
watch(addressResults, (results) => {
  // Bail if there is not enough input to do an API call anyway
  if (!isReadyForPostalCodeLookup.value) {
    return;
  }

  /**
   * Whenever the API results change, we want to clear the selected address.
   * Clear only data that is provided by the API, preserving user input.
   */
  selectedAddress.value = undefined;
  street.value = undefined;
  city.value = undefined;

  /**
   * If there's only one address, we may assume it's correct and select it.
   * A user *must* make a selection when there are multiple results.
   */
  if (results?.length && toValue(results)?.length === 1) {
    selectAddress(toValue(results)[0]);
  } else if (!results?.length) {
    // Append a validation error if no address was found
    validationErrors.value?.push({
      pointer: 'address',
      detail: 'No address found, enter manually or try again',
    });
    console.warn('No address found, enter manually or try again');
  }
});
</script>
