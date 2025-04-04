vi.spyOn(document, 'dispatchEvent');
const address: Address = {
  postalCode: '1234AB',
  houseNumber: '1',
  houseNumberSuffix: 'A',
  street: 'Main St',
  city: 'Amsterdam',
  countryCode: 'NL',
  postOfficeBox: false,
};
wrapper.vm.selectAddress(address);

const emitted = wrapper.emitted('address-selected');
expect(emitted).toHaveLength(1);
expect(emitted?.[0]).toEqual([address]);

// expect(mockEmit).toHaveBeenCalledWith('address-selected', address);
// Check for the window event
const event = new CustomEvent('address-selected', {detail: address});
expect(document.dispatchEvent).toHaveBeenCalledWith(event);
