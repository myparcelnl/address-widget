import {
  type Address,
  type Alpha2CountryCode,
  type GetAddressesData,
  type ProblemDetailsBadRequest,
  getAddresses,
} from '@/api-client';
import {ref, toValue, type MaybeRefOrGetter, type Ref} from 'vue';
import {useApiClient} from './useApiClient';

export function useAddressApi() {
  const addressResults: Ref<Address[] | undefined> = ref();
  const loading = ref(false);

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
   * Request address by postal code and house number.
   *
   * @param postalCode
   * @param houseNumber
   */
  const fetchAddressByPostalCode = async (
    postalCode: MaybeRefOrGetter<string>,
    houseNumber: MaybeRefOrGetter<string>,
    countryCode: MaybeRefOrGetter<Alpha2CountryCode>,
    houseNumberSuffix?: MaybeRefOrGetter<string>,
  ) => {
    loading.value = true;
    const {client} = useApiClient();

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

    loading.value = true;

    try {
      const {error, response, data} = await getAddresses({client, ...params});
      loading.value = false;

      // Throw a specific error if present
      if (error) {
        throw error;
      }

      // Otherwise, throw a generic one
      if (!response.ok) {
        throw new Error('Failed to fetch address'); // @TODO translate
      }

      addressResults.value = data.results;
    } catch (error) {
      // Catch to reset loading state and rethrow
      loading.value = false;
      throw error;
    }
  };

  return {
    addressResults,
    loading,
    isProblemDetailsBadRequest,
    fetchAddressByPostalCode,
  };
}
