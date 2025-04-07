import {toValue} from 'vue';
import {useProvideConfig} from '@/composables/useConfig';
import {delay, http, HttpResponse} from 'msw';

import {withSetup} from '../../withSetup';
import {MOCK_ADDRESSES} from '../data/addresses';
import {
  type GetAddressesData,
  type GetAddressesResponse,
  type GetValidateData,
  type GetValidateResponse,
} from './../../../src/api-client/types.gen';

const [[config]] = withSetup(useProvideConfig);
const baseUrl = toValue(config.apiUrl);

export const handlers = [
  http.all('*', async () => {
    await delay(100);
  }),

  // Validate handler not fully implemented, always returns true right now
  http.get<never, GetValidateData['body'], GetValidateResponse>(
    `${baseUrl}/validate`,
    () => {
      return HttpResponse.json({
        valid: true,
      });
    },
  ),

  // Addresses handler
  http.get<never, GetAddressesData['body'], GetAddressesResponse>(
    `${baseUrl}/addresses`,
    () => {
      // TODO: we should do a basic lookup in the mock response and emulate errors in the future
      return HttpResponse.json({
        results: MOCK_ADDRESSES,
      });
    },
  ),
];
