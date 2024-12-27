import {
  type Address,
  type Alpha2CountryCode,
  type GetAddressesData,
  getAddresses,
} from '@/api-client';
import {ref, toValue, type MaybeRefOrGetter, type Ref} from 'vue';
import {useApiClient} from './useApiClient';

export function useAddressApi() {
  const addressResults: Ref<Address[] | undefined> = ref();
  const loading = ref(false);

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
        houseNumberSuffix: toValue(houseNumberSuffix),
        countryCode: toValue(countryCode),
      },
      url: '/addresses',
    };

    loading.value = true;

    // Replace with your API call
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

    // Parse the response on non-error status
    addressResults.value = data.results;
  };

  return {
    addressResults,
    loading,
    fetchAddressByPostalCode,
  };
}
