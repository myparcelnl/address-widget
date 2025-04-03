import {client} from '@/api-client/sdk.gen';
import {useConfig, API_URL_DIRECT} from '@/composables/useConfig.ts';
import {useOrThrow} from '@/utils/useOrThrow';
import type {Client} from '@hey-api/client-fetch';
import {toValue} from 'vue';

/**
 * Provides the API client instance with the correct configuration.
 */
export function useApiClient() {
  const {apiKey, apiUrl} = useOrThrow(useConfig, 'useConfig');

  const configureClient = (): Client => {
    if (!apiUrl.value?.length) {
      console.error('Cannot init API: API URL is not set');
    }

    if (!apiKey.value && apiUrl.value === API_URL_DIRECT) {
      console.error('An API key must be set when using the default API URL');
    }

    client.setConfig({
      baseUrl: apiUrl.value,
    });

    client.interceptors.request.use((request) => {
      if (toValue(apiKey)?.length) {
        // Send the API key as a base64 encoded bearer token as per https://developer.myparcel.nl/api-reference/05.authentication.html
        request.headers.set(
          'Authorization',
          `bearer ${btoa(<string>toValue(apiKey))}`,
        );
      }
      return request;
    });
    return client;
  };

  return {
    configureClient,
    client,
  };
}
