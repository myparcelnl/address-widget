import {useAddressData} from '@/composables/useAddressData';
import {useAddressApi} from '@/composables/useAddressApi';
import {useHandleUserInput} from '@/composables/useHandleUserInput';
import {expect, it, vi} from 'vitest';
import {toValue} from 'vue';

it('handles postal code input', async () => {
  vi.mock('@/composables/useAddressApi', async () => {
    return {
      useAddressApi: vi.fn().mockReturnValue({
        fetchAddressByPostalCode: vi.fn(),
      }),
    };
  });

  const {handlePostalCodeInput} = useHandleUserInput();

  // Set the data
  const {postalCode, houseNumber} = useAddressData();
  postalCode.value = '1234AB';
  houseNumber.value = '1';

  await handlePostalCodeInput();
  const {fetchAddressByPostalCode} = useAddressApi();

  expect(fetchAddressByPostalCode).toHaveBeenCalledWith(
    toValue(postalCode),
    toValue(houseNumber),
    'NL',
    undefined,
  );
});

it('sets API errors as validation errors', async () => {
  vi.mock('@/composables/useAddressApi', async () => {
    return {
      useAddressApi: vi.fn().mockReturnValue({
        isProblemDetailsBadRequest: vi.fn().mockReturnValue(true),
        fetchAddressByPostalCode: vi.fn().mockRejectedValue({
          type: 'urn:problem:validation-error',
          status: 400,
          errors: ['foo'],
        }),
      }),
    };
  });

  const {handlePostalCodeInput, validationErrors} = useHandleUserInput();

  // Set the data
  const {postalCode, houseNumber} = useAddressData();
  postalCode.value = '1234AB';
  houseNumber.value = '1';

  await handlePostalCodeInput();
  expect(validationErrors.value).toEqual(['foo']);
});

it('handles override input', () => {
  const {isOverrideActive, handleOverrideInput} = useHandleUserInput();
  isOverrideActive.value = true;

  // Check the selected address changes whenever address data changes when override is active
  const {selectAddress, selectedAddress} = useAddressData();
  const address = {
    postalCode: '1234AB',
    houseNumber: '1',
    houseNumberSuffix: 'A',
    street: 'Main St',
    city: 'Amsterdam',
  };
  selectAddress(address);

  // Change some data
  const {street} = useAddressData();
  street.value = 'Some Street';
  handleOverrideInput();

  // Verify the selected address changed
  expect(selectedAddress.value.street).toEqual(street.value);
});
