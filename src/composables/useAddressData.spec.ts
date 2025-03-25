import {describe, it, expect, beforeEach, vi} from 'vitest';
import {useAddressData} from '@/composables/useAddressData';
import type {Address} from '@/api-client/types.gen';

describe('useAddressData', () => {
  let addressData: ReturnType<typeof useAddressData>;
  const mockEmit = vi.fn();

  beforeEach(() => {
    vi.spyOn(window, 'dispatchEvent');

    addressData = useAddressData(mockEmit);
    addressData.doReset();
  });

  it('should initialize with empty values', () => {
    expect(addressData.selectedAddress.value).toBeUndefined();
    expect(addressData.postalCode.value).toBeUndefined();
    expect(addressData.houseNumber.value).toBeUndefined();
    expect(addressData.houseNumberSuffix.value).toBeUndefined();
    expect(addressData.street.value).toBeUndefined();
    expect(addressData.city.value).toBeUndefined();
  });

  it('should reset all data', () => {
    addressData.selectedAddress.value = {
      postalCode: '1234AB',
      houseNumber: '1',
    } as Address;
    addressData.doReset();
    expect(addressData.selectedAddress.value).toBeUndefined();
    expect(addressData.postalCode.value).toBeUndefined();
    expect(addressData.houseNumber.value).toBeUndefined();
    expect(addressData.houseNumberSuffix.value).toBeUndefined();
    expect(addressData.street.value).toBeUndefined();
    expect(addressData.city.value).toBeUndefined();
  });

  it('should select an address and update fields', () => {
    const selectedAddress = addressData.selectedAddress;
    const address: Address = {
      postalCode: '1234AB',
      houseNumber: '1',
      houseNumberSuffix: 'A',
      street: 'Main St',
      city: 'Amsterdam',
    };
    addressData.selectAddress(address);
    expect(addressData.selectedAddress.value).toEqual(address);
    expect(addressData.postalCode.value).toBe(address.postalCode);
    expect(addressData.houseNumber.value).toBe(address.houseNumber);
    expect(addressData.houseNumberSuffix.value).toBe(address.houseNumberSuffix);
    expect(addressData.street.value).toBe(address.street);
    expect(addressData.city.value).toBe(address.city);
    expect(selectedAddress.value).toStrictEqual(address);
  });

  it('should emit an event when selecting an address', () => {
    const address: Address = {
      postalCode: '1234AB',
      houseNumber: '1',
      houseNumberSuffix: 'A',
      street: 'Main St',
      city: 'Amsterdam',
    };
    addressData.selectAddress(address);
    expect(mockEmit).toHaveBeenCalledWith('address-selected', address);
    // Check for the window event
    const event = new CustomEvent('address-selected', {detail: address});
    expect(window.dispatchEvent).toHaveBeenCalledWith(event);
  });

  it('should check if we have all the required data for a postal code lookup', () => {
    addressData.postalCode.value = '1234AB';
    addressData.houseNumber.value = '1';
    addressData.countryCode.value = 'NL';
    expect(addressData.isReadyForPostalCodeLookup.value).toBe(true);

    addressData.postalCode.value = '1234AB';
    addressData.houseNumber.value = '1';
    addressData.countryCode.value = 'US';
    expect(addressData.isReadyForPostalCodeLookup.value).toBe(false);

    addressData.postalCode.value = '1111';
    addressData.houseNumber.value = '1';
    addressData.countryCode.value = 'NL';
    expect(addressData.isReadyForPostalCodeLookup.value).toBe(false);
  });
});
