import {MOCK_ADDRESSES} from '../../tests/mockApi';
import {describe, it, expect, beforeEach} from 'vitest';
import {ref} from 'vue';
import {useAddressApi} from './useAddressApi';

describe('useAddressApi', () => {
  let addressApi: ReturnType<typeof useAddressApi>;

  beforeEach(() => {
    addressApi = useAddressApi();
  });

  it('should initialize with default values', () => {
    expect(addressApi.addressResults.value).toBeUndefined();
    expect(addressApi.loading.value).toBe(false);
  });

  it('should set loading state when fetching address', async () => {
    const fetchAddressByPostalCode = addressApi.fetchAddressByPostalCode;
    const postalCode = ref('1234AB');
    const houseNumber = ref('1');
    const countryCode = ref('NL');

    const fetchPromise = fetchAddressByPostalCode(
      postalCode,
      houseNumber,
      countryCode,
    );
    expect(addressApi.loading.value).toBe(true);

    await fetchPromise;
    expect(addressApi.loading.value).toBe(false);
  });

  it('should give a result when looking up a postal code', async () => {
    const addressResults = addressApi.addressResults;
    const fetchAddressByPostalCode = addressApi.fetchAddressByPostalCode;

    const postalCode = ref(MOCK_ADDRESSES[0].postalCode);
    const houseNumber = ref(MOCK_ADDRESSES[0].houseNumber);
    await fetchAddressByPostalCode(postalCode, houseNumber, 'NL');
    expect(addressResults.value).toEqual(MOCK_ADDRESSES);
  });

  it('should throw an error when looking up a postal code for a different country', async () => {
    const fetchAddressByPostalCode = addressApi.fetchAddressByPostalCode;
    const postalCode = ref('1234AB'); // NL
    const houseNumber = ref('1');
    const countryCode = ref('US');

    await expect(
      fetchAddressByPostalCode(postalCode, houseNumber, countryCode),
    ).rejects.toThrow(
      'Postal code lookup is only supported for the Netherlands',
    );
  });

  it('should reset state when calling resetState', async () => {
    const fetchAddressByPostalCode = addressApi.fetchAddressByPostalCode;
    const resetState = addressApi.resetState;
    const postalCode = ref('1234AB');
    const houseNumber = ref('1');
    const countryCode = ref('NL');

    await fetchAddressByPostalCode(postalCode, houseNumber, countryCode);
    expect(addressApi.loading.value).toBe(false);
    expect(addressApi.addressResults.value).toEqual(MOCK_ADDRESSES);

    resetState();
    expect(addressApi.loading.value).toBe(false);
    expect(addressApi.addressResults.value).toBeUndefined();
  });

  it('should abort previous requests when calling fetchAddressByPostalCode', async () => {
    const {getAddressesWithErrorHandling, loading} = addressApi;

    // Do NOT await the promise, so we can check that it gets cancelled when the second request fires
    const request1 = getAddressesWithErrorHandling(
      {
        postalCode: '1234AB',
        houseNumber: '1',
        countryCode: 'NL',
      },
      false,
    );
    const request2 = getAddressesWithErrorHandling(
      {
        postalCode: '1234AB',
        houseNumber: '13',
        countryCode: 'NL',
      },
      false,
    );

    expect(loading.value).toBe(true);

    // Check if the first request was cancelled
    // TODO: use MSW or similar as we can't test this with the current setup
    // await expect(request1).rejects.toThrow('aborted');
    // await expect(request2).resolves.toBeTruthy();
  });
});
