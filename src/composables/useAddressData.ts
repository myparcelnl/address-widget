import type {Alpha2CountryCode} from '@/api-client';
import type {Address} from '@/api-client/types.gen';
import {computed, ref, toValue, watch, type Ref} from 'vue';
import type {ProblemDetailsBadRequest} from '@/api-client/types.gen';
import {createInjectionState} from '@vueuse/core';
import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig} from './useConfig';

const POSTAL_CODE_MIN_LENGTH = 6; // eg. 1111AA - only relevant for NL postal codes at this point
export type ValidationErrors = NonNullable<ProblemDetailsBadRequest['errors']>;

/**
 * Provides reactive properties and methods for storing address data.
 * @param emit Provide an event emitter to emit events when the selected address changes. If empty, no events will be emitted.
 * @returns
 */
export const [useProvideAddressData, useAddressData] = createInjectionState(
  () => {
    const {country: countryCode} = useOrThrow(useConfig, 'useConfig');
    const postalCode: Ref<string | undefined> = ref();
    const houseNumber: Ref<string | undefined> = ref();
    const houseNumberSuffix: Ref<string | undefined> = ref();
    const street: Ref<string | undefined> = ref();
    const city: Ref<string | undefined> = ref();

    // Stores the full address for actual usage by consuming plugins/forms
    const selectedAddress: Ref<Address | undefined> = ref();

    // Contains both API and user input validation errors
    const validationErrors: Ref<ValidationErrors> = ref([]);

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

    /**
     * Reset most of the state when the country changes.
     */
    watch(countryCode, () => {
      doReset();
    });

    return {
      countryCode,
      postalCode,
      houseNumber,
      houseNumberSuffix,
      street,
      city,
      selectedAddress,
      doReset,
      selectAddress,
      hasRequiredPostalcodeLookupAttributes,
      isReadyForPostalCodeLookup,
      validationErrors,
    };
  },
);
