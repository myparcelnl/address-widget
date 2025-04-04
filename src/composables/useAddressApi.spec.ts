import {MOCK_ADDRESSES} from './../../tests/mocks/data/addresses';
import {describe, it, expect, beforeEach, vi} from 'vitest';
import {ref} from 'vue';
import {useProvideAddressApi} from './useAddressApi';
import {useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';
import {useProvideAddressData} from './useAddressData';

describe('useAddressApi', () => {
  let addressApi: ReturnType<typeof useProvideAddressApi>;
  let config: ReturnType<typeof useProvideConfig>;

  beforeEach(() => {
    [[config, , addressApi]] = withSetup(
      useProvideConfig,
      useProvideAddressData,
      useProvideAddressApi,
    );

    config.setConfig({
      apiUrl: 'https://address.api.myparcel.nl',
      apiKey: 'fakeApiKey',
      country: 'NL',
    });
  });

  it('correctly recognizes a ProblemDetailsBadRequest error', () => {
    const error = {
      type: 'urn:problem:validation-error',
      status: 400,
      errors: ['foo'],
    };
    const isProblemDetailsBadRequest =
      addressApi.isProblemDetailsBadRequest(error);
    expect(isProblemDetailsBadRequest).toBe(true);
  });

  it('correctly recognizes a non-ProblemDetailsBadRequest error', () => {
    const error = {
      type: 'urn:problem:not-a-validation-error',
      status: 400,
      errors: ['foo'],
    };
    expect(addressApi.isProblemDetailsBadRequest(error)).toBe(false);

    const error2 = 'Something went wrong!!';
    expect(addressApi.isProblemDetailsBadRequest(error2)).toBe(false);
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
    await expect(request1).rejects.toThrow(
      'Request cancelled because of new input',
    );
    // Check the second one went through, not that we check that it does resolve,
    // but it should resolve without returning any data
    return await expect(request2).resolves.toBeUndefined();
  });

  it('only logs the abort error as debug when silentAbort is true', async () => {
    const {getAddressesWithErrorHandling} = addressApi;
    const consoleSpy = vi.spyOn(console, 'debug').mockImplementation(() => {});

    // Do NOT await the promise, so we can check that it gets cancelled when the second request fires
    const request1 = getAddressesWithErrorHandling(
      {
        postalCode: '1234AB',
        houseNumber: '1',
        countryCode: 'NL',
      },
      true,
    );
    const request2 = getAddressesWithErrorHandling(
      {
        postalCode: '1234AB',
        houseNumber: '13',
        countryCode: 'NL',
      },
      true,
    );
    await request1;
    await request2;

    expect(consoleSpy).toHaveBeenCalledWith(
      'Request was aborted because it did not finish in time for new input.',
    );
    consoleSpy.mockRestore();
  });
});
