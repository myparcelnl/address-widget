<template>
  <pre>
    Voorbeeld met toevoegingen:
    Herestraat 77
    9711 LC Groningen
  </pre>
  <div
    class="p-4 flex flex-col space-y-4 max-w-80"
    :data-loading="loading">
    <FieldCountry
      v-model="countryCode"
      @change.stop="handleCountryChange"></FieldCountry>

    <template v-if="countryCode?.length">
      <template v-if="countryCode === 'NL'">
        <span
          v-if="notFound && !validationErrors?.length"
          class="text-red-500">
          No address found, are you sure the postal code and house number are
          correct?
        </span>
        <span
          v-if="validationErrors?.length"
          class="text-red-500">
          {{ validationErrors }}
        </span>

        <FieldPostalCode
          v-model="postalCode"
          @input.stop="handlePostalCodeInput"></FieldPostalCode>
        <FieldHouseNumber
          v-model="houseNumber"
          @input.stop="handlePostalCodeInput"></FieldHouseNumber>
        <FieldHouseNumberSuffix
          v-model="houseNumberSuffix"
          @input.stop="handlePostalCodeInput"></FieldHouseNumberSuffix>

        <template
          v-if="addressResults && addressResults?.length > 1 && !loading">
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

      <template v-else>
        <FieldAddressAutocomplete
          v-model="searchQuery"
          @input.stop="handleAutocompleteInput" />

        <p v-if="searchQuery?.length && !isReadyForAutocompleteSearch">
          Enter at least a street and house number to start searching.<br />
          Example:
          <em> Herestraat 77 </em>
        </p>

        <template
          v-if="addressResults && addressResults?.length > 1 && !loading">
          <FieldAddressSelect
            :addresses="addressResults"
            @address-select="selectAddress"></FieldAddressSelect>
        </template>
      </template>
    </template>
  </div>

  <section>
    <h2 class="font-bold">Address to be sent to MyParcel:</h2>
    <pre
      v-if="selectedAddress"
      class="p-3 bg-slate-200 inline-block"
      >{{ selectedAddress }}</pre
    >
  </section>
</template>

<script setup lang="ts">
import {ref, toValue, watch, type Ref} from 'vue';

import {useDebounceFn} from '@vueuse/core';

import FieldAddressAutocomplete from '@/components/FieldAddressAutocomplete.vue';
import FieldAddressSelect from '@/components/FieldAddressSelect.vue';
import FieldCountry from '@/components/FieldCountry.vue';
import FieldPostalCode from '@/components/FieldPostalCode.vue';
import FieldHouseNumber from '@/components/FieldHouseNumber.vue';
import FieldHouseNumberSuffix from '@/components/FieldHouseNumberSuffix.vue';
import FieldStreet from '@/components/FieldStreet.vue';
import FieldCity from '@/components/FieldCity.vue';
import ButtonOverride from '@/components/ButtonOverride.vue';

import {useAddressApi} from '@/composables/useAdressApi';
import {
  useAddressData,
  type AddressSelectEvent,
} from '@/composables/useAddressData';

const emit = defineEmits<AddressSelectEvent>();

/** Address data **/
const {
  countryCode,
  searchQuery,
  postalCode,
  houseNumber,
  houseNumberSuffix,
  street,
  city,
  selectedAddress,
  doReset,
  selectAddress,
  hasRequiredPostalcodeLookupAttributes,
  isReadyForAutocompleteSearch,
  isReadyForPostalCodeLookup,
} = useAddressData(emit);

/** UI states **/
type ValidationError = {
  detail: string;
  pointer: string;
};
const validationErrors: Ref<ValidationError[] | undefined> = ref();
const notFound = ref(false);
const isOverrideActive = ref(false); // when the user wants to override the API response

/** API states **/
const {
  addressResults,
  loading,
  isProblemDetailsBadRequest,
  fetchAddressByPostalCode,
  fetchAddressBySearchQuery,
} = useAddressApi();

const handleCountryChange = () => {
  doReset();
  // Reset API results too
  addressResults.value = undefined;
};

/**
 * Respond to input on postal code and house number fields with an API response when appropiate.
 * Currently, autocomplete on housenumber+postalCode is only available for NL.
 */
const handlePostalCodeInput = async () => {
  const data = {
    countryCode,
    postalCode,
    houseNumber,
    houseNumberSuffix,
  };
  if (hasRequiredPostalcodeLookupAttributes(data)) {
    await useDebounceFn(async (data) => {
      try {
        // Pass values and not refs to make sure we use the current values
        await fetchAddressByPostalCode(
          toValue(data.postalCode),
          toValue(data.houseNumber),
          toValue(data.countryCode),
          toValue(data.houseNumberSuffix),
        );
      } catch (error) {
        if (isProblemDetailsBadRequest(error)) {
          // @TODO handle validation error
          validationErrors.value = error.errors;
        } else {
          // Re-throw any other error
          throw error;
        }
      }
    }, 100)(data);
  } else {
    // Clear the results
    addressResults.value = undefined;
  }
};

const handleAutocompleteInput = async () => {
  if (isReadyForAutocompleteSearch.value) {
    await useDebounceFn(async (searchQuery, countryCode) => {
      try {
        // Pass values and not refs to make sure we use the current values
        await fetchAddressBySearchQuery(searchQuery, countryCode);
      } catch (error) {
        if (isProblemDetailsBadRequest(error)) {
          // @TODO handle validation error
          validationErrors.value = error.errors;
        }
      }
    }, 100)(toValue(searchQuery), toValue(countryCode));
  } else {
    // Clear the results
    addressResults.value = undefined;
  }
};

/**
 * When a user manually enters an address, override the selectedAddress with user-provided data and clear the API data.
 */
const handleOverrideInput = () => {
  const postalData = {countryCode, postalCode, houseNumber};
  if (
    toValue(isOverrideActive) &&
    hasRequiredPostalcodeLookupAttributes(postalData) &&
    typeof street.value === 'string' &&
    typeof city.value === 'string'
  ) {
    selectAddress({
      street: street.value,
      city: city.value,
      postalCode: toValue(postalData.postalCode.value),
      houseNumber: toValue(postalData.houseNumber.value),
      houseNumberSuffix: toValue(houseNumberSuffix),
      countryCode: toValue(postalData.countryCode),
      postOfficeBox: false, // cannot be user-defined, so assume false,
    });
  }
};

/**
 * Handle UI updates when API results change.
 */
watch(addressResults, (results) => {
  // Bail if there is not enough input to do an API call anyway
  if (
    !isReadyForAutocompleteSearch.value &&
    !isReadyForPostalCodeLookup.value
  ) {
    return;
  }
  // Clear any selected address without clearing user input
  selectedAddress.value = undefined;
  street.value = undefined;
  city.value = undefined;

  /**
   * If there's only one address, we may assume it's correct and select it.
   * A dropdown with different options is displayed when there are multiple addresses.
   */
  if (results?.length) {
    notFound.value = false;
  } else {
    notFound.value = true;
    console.warn('No address found, enter manually or try again');
  }

  // If there's only one address, select it
  if (results?.length && toValue(results)?.length === 1) {
    notFound.value = false;
    selectAddress(toValue(results)[0]);
  }
});
</script>
