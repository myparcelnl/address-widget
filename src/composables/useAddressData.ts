import type {Alpha2CountryCode} from '@/api-client';
import type {Address} from '@/api-client/types.gen';
import {computed, ref, toValue, watch, type Ref} from 'vue';

/**
 * This composable contains all the logic for handling address data that is not specifically bound to UI implementation and/or user input events.
 */

const SEARCH_STREET_MIN_LENGTH = 3; // arbitrary minimum length for search queries
const POSTAL_CODE_MIN_LENGTH = 6; // eg. 1111AA - only relevant for NL postal codes at this point
export type AddressSelectEvent = {
  (event: 'address-selected', address: Address | null): void;
};

/**
 * Provise reactive properties and methods for storing address data.
 * @param emit Provide an event emitter to emit events when the selected address changes. If empty, no events will be emitted.
 * @returns
 */
export function useAddressData(emit?: AddressSelectEvent) {
  const countryCode: Ref<Alpha2CountryCode | undefined> = ref();
  const postalCode: Ref<string | undefined> = ref();
  const houseNumber: Ref<string | undefined> = ref();
  const houseNumberSuffix: Ref<string | undefined> = ref();
  const street: Ref<string | undefined> = ref();
  const city: Ref<string | undefined> = ref();
  const searchQuery: Ref<string | undefined> = ref();
  const selectedAddress: Ref<Address | undefined> = ref(); // stores the full address for actual usage by consuming plugins/forms

  /**
   * Reset the form and stored address data.
   */
  const doReset = () => {
    selectedAddress.value = undefined;
    postalCode.value = undefined;
    houseNumber.value = undefined;
    houseNumberSuffix.value = undefined;
    street.value = undefined;
    city.value = undefined;
    searchQuery.value = undefined;
  };

  /**
   * Override both user input and the emitted address with incoming data.
   */
  const selectAddress = (address: Address) => {
    selectedAddress.value = address;
    postalCode.value = address.postalCode;
    houseNumber.value = address.houseNumber;
    houseNumberSuffix.value = address.houseNumberSuffix;
    street.value = address.street;
    city.value = address.city;
  };

  /**
   * We use different kinds of lookups in NL (PostalCode-based) and rest-of world.
   * This is a basic validator on whether we can do a lookup based on postal code and house number.
   */
  function hasRequiredPostalcodeLookupAttributes(data: {
    countryCode: Ref<Alpha2CountryCode | undefined>;
    postalCode: Ref<string | undefined>;
    houseNumber: Ref<string | undefined>;
  }): data is {
    countryCode: Ref<'NL'>;
    postalCode: Ref<string>;
    houseNumber: Ref<string>;
  } {
    return (
      toValue(data.countryCode) === 'NL' &&
      (toValue(data.postalCode)?.length ?? 0) >= POSTAL_CODE_MIN_LENGTH &&
      (toValue(data.houseNumber)?.length ?? 0) > 0
    );
  }

  /**
   * Only start searching when the query (probably) contains a street and house number by doing a simple regex check.
   */
  const isReadyForAutocompleteSearch = computed<boolean>(() => {
    const regex = new RegExp(
      `(?=.*[a-zA-Z]{${SEARCH_STREET_MIN_LENGTH},})(?=.*\\d)`,
    );
    return !!searchQuery.value && regex.test(searchQuery.value);
  });

  /**
   * Computed property to check if we have all the required data to do a postal code lookup.
   * This is slightly duplicated with the typeguard above -- using this computed is only possible in situations where the data should not need to be typed afterwards.
   */
  const isReadyForPostalCodeLookup = computed<boolean>(() => {
    return hasRequiredPostalcodeLookupAttributes({
      countryCode,
      postalCode,
      houseNumber,
    });
  });

  // Emit an event whenever selectedAddress changes, as this will be relevant to watch for changes in consiming plugins/forms
  if (emit) {
    watch(selectedAddress, (address) => {
      // TODO: Add exported consts with event names
      emit('address-selected', address || null);
      window.dispatchEvent(
        new CustomEvent('address-selected', {detail: address}),
      );
    });
  }

  return {
    countryCode,
    postalCode,
    houseNumber,
    houseNumberSuffix,
    street,
    city,
    searchQuery,
    selectedAddress,
    doReset,
    selectAddress,
    hasRequiredPostalcodeLookupAttributes,
    isReadyForPostalCodeLookup,
    isReadyForAutocompleteSearch,
  };
}
