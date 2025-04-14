import {useOutgoingEvents} from './useOutgoingEvents';
import {Address} from '../api-client/types.gen';
import {describe, expect, it, vi} from 'vitest';
import {withSetup} from '../../tests/withSetup';
import {useProvideConfig} from './useConfig';

describe('useOutgoingEvents', () => {
  it('should emit and dispatch the ADDRESS_SELECTED_EVENT', () => {
    const emit = vi.fn();
    const [[config, outgoingEvents]] = withSetup(
      {composable: useProvideConfig},
      {composable: useOutgoingEvents},
    );
    const {emitAddressChange} = outgoingEvents;

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

    emitAddressChange(address, emit);

    const event = new CustomEvent('address-selected', {
      detail: {...address, appIdentifier: config.appIdentifier},
    });
    expect(document.dispatchEvent).toHaveBeenCalledWith(event);

    // Verify the emitted event
    expect(emit).toHaveBeenCalledWith('address-selected', address);
    expect(emit).toHaveBeenCalledTimes(1);
  });
});
