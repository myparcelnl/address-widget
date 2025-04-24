import {ref, toValue} from 'vue';
import {useDebounceFn} from '@vueuse/core';
import {useAddressData} from './useAddressData';
import {useAddressApi} from './useAddressApi';
import {useTranslation} from './useTranslation';
import {useOrThrow} from '@/utils/useOrThrow';
import {postalCodeLookupSchema} from '@/schemas/postalCodeLookupSchema.ts';

export const REQUEST_DEBOUNCE_TIME = 150; // arbitrary debounce time for API requests

/**
 * Contains necessary logic for user input handling.
 */
export function useHandleUserInput() {
  const {t} = useTranslation();
  /* State */

  // Whether the user is manually entering an address.
  const isOverrideActive = ref(false);

  const {
    countryCode,
    postalCode,
    houseNumber,
    houseNumberSuffix,
    street,
    city,
    selectAddress,
    hasRequiredPostalcodeLookupAttributes,
    validationErrors,
  } = useOrThrow(useAddressData, 'useAddressData');

  const {isProblemDetailsBadRequest, fetchAddressByPostalCode, resetState} =
    useOrThrow(useAddressApi, 'useAddressApi');

  /**
   * Respond to input on postal code and house number fields with an API response when appropiate.
   * Currently, autocomplete on housenumber+postalCode is only available for NL.
   */
  const handlePostalCodeInput = useDebounceFn(async () => {
    const data = {
      countryCode,
      postalCode,
      houseNumber,
      houseNumberSuffix,
    };
    if (hasRequiredPostalcodeLookupAttributes(data)) {
      validationErrors.value = [];

      const schema = postalCodeLookupSchema();
      const result = schema.safeParse({
        postalCode: toValue(data.postalCode),
        houseNumber: toValue(data.houseNumber),
      });

      if (!result.success) {
        validationErrors.value = result.error.errors.map((err) => ({
          pointer: err.path[0].toString(),
          detail: t(err.message),
        }));

        return;
      }

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
          validationErrors.value = error.errors ?? [];
        } else {
          // Re-throw any other error
          throw error;
        }
      }
    } else {
      // Clear the results
      resetState();
    }
  }, REQUEST_DEBOUNCE_TIME);

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
        postOfficeBox: false, // cannot be user-defined, so assume false.
      });
    }
  };

  return {
    handlePostalCodeInput,
    handleOverrideInput,
    validationErrors,
    isOverrideActive,
  };
}
