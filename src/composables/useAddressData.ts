import type {Alpha2CountryCode} from '@/api-client';
import type {Address} from '@/api-client/types.gen';
import {computed, ref, toValue, watch, type MaybeRef, type Ref} from 'vue';
import type {ProblemDetailsBadRequest} from '@/api-client/types.gen';
import {createInjectionState} from '@vueuse/core';
import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig} from './useConfig';
import {isEqual} from 'lodash-es';

const POSTAL_CODE_MIN_LENGTH = 6; // eg. 1111AA - only relevant for NL postal codes at this point
export type ValidationErrors = NonNullable<ProblemDetailsBadRequest['errors']>;

/**
 * Provides reactive properties and methods for storing address data.
 * @param emit Provide an event emitter to emit events when the selected address changes. If empty, no events will be emitted.
 * @returns
 */
export const [useProvideAddressData, useAddressData] = createInjectionState(
  () => {
    const {configuration} = useOrThrow(useConfig, 'useConfig');

    // Initialize address with values from config, if provided
    const postalCode: Ref<string | undefined> = ref(
      configuration.value.address?.postalCode,
    );
    const houseNumber: Ref<string | undefined> = ref(
      configuration.value.address?.houseNumber,
    );
    const houseNumberSuffix: Ref<string | undefined> = ref(
      configuration.value.address?.houseNumberSuffix,
    );
    const street: Ref<string | undefined> = ref(
      configuration.value.address?.street,
    );
    const city: Ref<string | undefined> = ref(
      configuration.value.address?.city,
    );
    const countryCode: Ref<Alpha2CountryCode | undefined> = ref(
      configuration.value.address?.countryCode,
    );

    // Stores the full address for actual usage by consuming plugins/forms
    const selectedAddress: Ref<Address | undefined> = ref();

    // Contains both API and user input validation errors
    const validationErrors: Ref<ValidationErrors> = ref([]);

    /**
     * Reset the form and stored address data.
     */
    const doReset = (excludePostalCodeAndHouseNumber: boolean = false) => {
      selectedAddress.value = undefined;
      houseNumberSuffix.value = undefined;
      street.value = undefined;
      city.value = undefined;

      if (excludePostalCodeAndHouseNumber !== true) {
        postalCode.value = undefined;
        houseNumber.value = undefined;
      }
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
      countryCode.value = address.countryCode;
    };

    /**
     * We use different kinds of lookups in NL (PostalCode-based) and rest-of world.
     * This is a basic validator on whether we can do a lookup based on postal code and house number.
     */
    function hasRequiredPostalcodeLookupAttributes<
      T extends Record<string, MaybeRef<string | undefined | null>>,
    >(
      data: T,
    ): data is T & {
      countryCode: MaybeRef<'NL'>;
      postalCode: MaybeRef<string>;
      houseNumber: MaybeRef<string>;
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
    watch(countryCode, (newVal, oldVal) => {
      // Do not reset if the country was undefined before.
      if (oldVal === undefined) {
        return;
      }
      doReset();
    });

    /**
     * When the address provided to config changes, override whatever was stored.
     */
    watch(
      () => configuration.value.address,
      (newAddress, oldAddress) => {
        // Deeply compare the address object to see if it changed, as this will trigger for any config change.
        if (!newAddress || isEqual(newAddress, oldAddress)) {
          return;
        }

        // Only override defined values
        if (newAddress.countryCode !== undefined) {
          countryCode.value = newAddress.countryCode;
        }
        if (newAddress.postalCode !== undefined) {
          postalCode.value = newAddress.postalCode;
        }
        if (newAddress.houseNumber !== undefined) {
          houseNumber.value = newAddress.houseNumber;
        }
        if (newAddress.houseNumberSuffix !== undefined) {
          houseNumberSuffix.value = newAddress.houseNumberSuffix;
        }
        if (newAddress.street !== undefined) {
          street.value = newAddress.street;
        }
        if (newAddress.city !== undefined) {
          city.value = newAddress.city;
        }
      },
      {deep: false, immediate: true},
    );

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
