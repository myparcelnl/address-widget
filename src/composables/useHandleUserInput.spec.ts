import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {nextTick, toValue} from 'vue';
import {withSetup} from '../../tests/withSetup';
import {useProvideAddressApi} from './useAddressApi';
import {useProvideConfig} from './useConfig';
import {useHandleUserInput} from './useHandleUserInput';
import {useProvideAddressData} from './useAddressData';
import {server} from '../../tests/mocks/requests/node';
import {http, HttpResponse} from 'msw';
import {
  GetAddressesData,
  ProblemDetails,
  ProblemDetailsBadRequest,
} from '../api-client/types.gen';
import {createInjectionState} from '@vueuse/core';

describe('useHandleUserInput', () => {
  let config: ReturnType<typeof useProvideConfig>;
  let addressData: ReturnType<typeof useProvideAddressData>;
  let addressApi: ReturnType<typeof useProvideAddressApi>;
  let userInput: ReturnType<typeof useHandleUserInput>;

  beforeEach(async () => {
    const [mockUseProvideAddressApi] = createInjectionState(
      () => {
        const original = useProvideAddressApi();
        return {
          ...original,
          resetState: vi.spyOn(original, 'resetState') as unknown as () => void,
          fetchAddressByPostalCode: vi.spyOn(
            original,
            'fetchAddressByPostalCode',
          ) as unknown as ReturnType<
            typeof useProvideAddressApi
          >['fetchAddressByPostalCode'],
        };
      },
      {injectionKey: 'useAddressApi'},
    );

    [[config, addressData, addressApi, userInput]] = withSetup(
      {composable: useProvideConfig},
      {composable: useProvideAddressData},
      {composable: mockUseProvideAddressApi}, // we need to spy on methods returned by this composable, before it is injected with provide/inject
      {composable: useHandleUserInput},
    );

    config.configuration.value.address = {countryCode: 'NL'};
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    server.resetHandlers();
  });

  it('handles postal code input', async () => {
    const {fetchAddressByPostalCode} = addressApi;
    const {postalCode, houseNumber} = addressData;
    const {handlePostalCodeInput} = userInput;

    // Set the data
    postalCode.value = '1234AB';
    houseNumber.value = '1';

    await handlePostalCodeInput();

    expect(fetchAddressByPostalCode).toHaveBeenCalledWith(
      toValue(postalCode),
      toValue(houseNumber),
      'NL',
      undefined,
    );
  });

  it('sets API errors as validation errors', async () => {
    const baseUrl = toValue(config.configuration.value.apiUrl);
    const errors = [
      {
        detail: 'foo',
        pointer: '/bar',
      },
    ];
    server.use(
      http.get<never, GetAddressesData['body'], ProblemDetailsBadRequest>(
        `${baseUrl}/addresses`,
        () => {
          return HttpResponse.json(
            {
              title: 'Validation error',
              detail: 'foo',
              instance: '/baz',
              type: 'urn:problem:validation-error',
              status: 400,
              errors,
            },
            {status: 400},
          );
        },
      ),
    );

    const {handlePostalCodeInput} = userInput;

    // Set the data
    const {postalCode, houseNumber, countryCode, validationErrors} =
      addressData;
    postalCode.value = '1234AB';
    houseNumber.value = '1';
    countryCode.value = 'NL';

    await handlePostalCodeInput();
    await nextTick();

    expect(validationErrors.value).toEqual(errors);
  });

  it('re-throws non-validation errors', async () => {
    const {handlePostalCodeInput} = userInput;

    // Set the data
    const {postalCode, houseNumber, countryCode, validationErrors} =
      addressData;
    postalCode.value = '1234AB';
    houseNumber.value = '1';
    countryCode.value = 'NL';

    const baseUrl = toValue(config.configuration.value.apiUrl);
    server.use(
      http.get<never, GetAddressesData['body'], ProblemDetails>(
        `${baseUrl}/addresses`,
        () => {
          return HttpResponse.json(
            {
              title: 'Internal server error',
              detail: 'foo',
              instance: '/baz',
              type: 'urn:problem:server',
              status: 500,
            },
            {status: 500},
          );
        },
      ),
    );

    await expect(handlePostalCodeInput).rejects.toThrow();
    expect(validationErrors.value).toEqual([]);
  });

  it('resets validation state when no postal code or house number is provided', async () => {
    const {resetState} = addressApi;
    const {handlePostalCodeInput} = userInput;
    const {postalCode, houseNumber} = addressData;
    const {validationErrors} = addressData;

    postalCode.value = '';
    houseNumber.value = '';
    await handlePostalCodeInput();
    expect(validationErrors.value).toEqual([]);
    expect(resetState).toHaveBeenCalled();
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
      countryCode: 'NL',
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
