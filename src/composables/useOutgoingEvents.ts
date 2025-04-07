import {toValue} from 'vue';
import type {Address} from '@/api-client';
import {useConfig} from './useConfig';
import {useOrThrow} from '@/utils/useOrThrow';

export const ADDRESS_SELECTED_EVENT = 'address-selected';
export type AddressSelectedEvent = {
  (event: typeof ADDRESS_SELECTED_EVENT, address: Address | null): void;
};
export type AddressEventPayload = {
  detail: Address & {appIdentifier: string | undefined};
};

export const useOutgoingEvents = () => {
  const config = useOrThrow(useConfig, 'useConfig');
  const emitAddressChange = (
    address: Address | undefined,
    emit: AddressSelectedEvent,
  ) => {
    emit(ADDRESS_SELECTED_EVENT, address || null);

    document.dispatchEvent(
      new CustomEvent(ADDRESS_SELECTED_EVENT, {
        detail: {
          ...address,
          appIdentifier: toValue(config.appIdentifier),
        },
      } as AddressEventPayload),
    );
  };

  return {
    emitAddressChange,
  };
};
