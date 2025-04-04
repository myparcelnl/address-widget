import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {toValue} from 'vue';
import {withSetup} from '../../tests/withSetup';
import {useProvideAddressApi} from './useAddressApi';
import {useProvideAddressData} from './useAddressData';
import {useProvideConfig} from './useConfig';
import {useHandleUserInput} from './useHandleUserInput';

// Mock the `useProvideAddressApi` composable, ensure the returned functions for both provide and inject point to the same mock
const mockFetchAddressByPostalCode = vi.hoisted(() => vi.fn());
const mockProblemDetailsRequest = vi.hoisted(() => vi.fn());

vi.mock('@/composables/useAddressApi', () => ({
  useProvideAddressApi: vi.fn().mockReturnValue({
    isProblemDetailsBadRequest: mockProblemDetailsRequest,
    fetchAddressByPostalCode: mockFetchAddressByPostalCode,
  }),
  useAddressApi: vi.fn().mockReturnValue({
    isProblemDetailsBadRequest: mockProblemDetailsRequest,
    fetchAddressByPostalCode: mockFetchAddressByPostalCode,
  }),
}));

describe('useHandleUserInput', () => {
  let addressData: ReturnType<typeof useProvideAddressData>;
  let addressApi: ReturnType<typeof useProvideAddressApi>;
  let userInput: ReturnType<typeof useHandleUserInput>;

  beforeEach(() => {
    [[, addressData, addressApi, userInput]] = withSetup(
      useProvideConfig,
      useProvideAddressData,
      useProvideAddressApi,
      useHandleUserInput,
    );
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('handles postal code input', async () => {
    const {fetchAddressByPostalCode} = addressApi;
    const {postalCode, houseNumber} = addressData;
    const {handlePostalCodeInput} = userInput;

    // Set the data
    postalCode.value = '1234AB';
    houseNumber.value = '1';

    await handlePostalCodeInput();

    // expect(fetchAddressByPostalCode).toHaveBeenCalledOnce();
    expect(fetchAddressByPostalCode).toHaveBeenCalledWith(
      toValue(postalCode),
      toValue(houseNumber),
      'NL',
      undefined,
    );
  });

  it('sets API errors as validation errors', async () => {
    vi.mocked(addressApi.isProblemDetailsBadRequest).mockReturnValue(true);
    vi.mocked(addressApi.fetchAddressByPostalCode).mockRejectedValue({
      type: 'urn:problem:validation-error',
      status: 400,
      errors: ['foo'],
    });

    const {handlePostalCodeInput, validationErrors} = userInput;

    // Set the data
    const {postalCode, houseNumber, countryCode} = addressData;
    postalCode.value = '1234AB';
    houseNumber.value = '1';
    countryCode.value = 'NL';

    await handlePostalCodeInput();
    expect(validationErrors.value).toEqual(['foo']);
  });

  it('handles override input', () => {
    const {isOverrideActive, handleOverrideInput} = userInput;
    isOverrideActive.value = true;

    // Check the selected address changes whenever address data changes when override is active
    const {selectAddress, selectedAddress} = addressData;
    const address = {
      postalCode: '1234AB',
      houseNumber: '1',
      houseNumberSuffix: 'A',
      street: 'Main St',
      city: 'Amsterdam',
    };
    selectAddress(address);

    // Change some data
    const {street} = addressData;
    street.value = 'Some Street';
    handleOverrideInput();

    // Verify the selected address changed
    expect(selectedAddress.value.street).toEqual(street.value);
  });
});
