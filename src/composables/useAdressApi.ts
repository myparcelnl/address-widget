import {
  type Address,
  type Alpha2CountryCode,
  type GetAddressesData,
  type ProblemDetailsBadRequest,
  getAddresses,
} from '@/api-client';
import {ref, toValue, type MaybeRefOrGetter, type Ref} from 'vue';
import {useApiClient} from './useApiClient';

const ABORT_REASON = new Error('Request cancelled because of new input');

// State
const addressResults: Ref<Address[] | undefined> = ref();
const loading = ref(false);
const abortController: Ref<AbortController | undefined> = ref();

/**
 * Provides reactive state and wrapper functions for the address API SDK.
 */
export function useAddressApi() {
  // Methods
  const isProblemDetailsBadRequest = (
    error: unknown,
  ): error is ProblemDetailsBadRequest => {
    if (typeof error !== 'object' || error === null) {
      return false;
    }

    const problemDetails = error as ProblemDetailsBadRequest;
    return (
      problemDetails.type === 'urn:problem:validation-error' &&
      problemDetails.status === 400 &&
      Array.isArray(problemDetails.errors)
    );
  };

  /**
   * Clear any API results and loading state.
   */
  const resetState = () => {
    addressResults.value = undefined;
    loading.value = false;
  };

  /**
   * Request address by postal code and house number.
   *
   * @param postalCode
   * @param houseNumber
   * @param countryCode
   * @param houseNumberSuffix
   */
  const fetchAddressByPostalCode = async (
    postalCode: MaybeRefOrGetter<string>,
    houseNumber: MaybeRefOrGetter<string>,
    countryCode: MaybeRefOrGetter<Alpha2CountryCode>,
    houseNumberSuffix?: MaybeRefOrGetter<string>,
  ) => {
    // Postal code lookup is only supported for the Netherlands at this moment
    if (toValue(countryCode) !== 'NL') {
      throw new Error(
        'Postal code lookup is only supported for the Netherlands', // @TODO translate
      );
    }

    const params: GetAddressesData = {
      query: {
        postalCode: toValue(postalCode) || '',
        houseNumber: toValue(houseNumber) || '',
        houseNumberSuffix: toValue(houseNumberSuffix)?.length
          ? toValue(houseNumberSuffix)
          : undefined,
        countryCode: toValue(countryCode),
      },
      url: '/addresses',
    };

    await getAddressesWithErrorHandling(params);
  };

  /**
   * Call the SDK `getAdresses` with standardized error handling and request aborts.
   * @param params
   */
  const getAddressesWithErrorHandling = async (params: GetAddressesData) => {
    const {client} = useApiClient();

    // Abort any existing requests and create a new controller
    abortController.value?.abort(ABORT_REASON);
    abortController.value = new AbortController();

    try {
      loading.value = true;
      const {error, response, data} = await getAddresses({
        client,
        ...params,
        signal: abortController.value?.signal,
      });
      loading.value = false;

      // Throw an error if the request didn't error but returned an error object.
      if (error) {
        throw error;
      }

      // If the request didn't error but the response was not ok, throw an error.
      if (!response.ok) {
        throw new Error('Failed to fetch address'); // @TODO translate
      }

      addressResults.value = data.results;
    } catch (error) {
      // Catch to reset loading state and rethrow
      loading.value = false;

      // Ignore the error if the request was aborted by us.
      if (error === ABORT_REASON) {
        console.debug(
          'Request was aborted because it did not finish in time for new input.',
        );
        return;
      }
      throw error;
    }
  };

  return {
    addressResults,
    loading,
    isProblemDetailsBadRequest,
    resetState,
    fetchAddressByPostalCode,
  };
}
