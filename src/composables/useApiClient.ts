import {client} from '@/api-client/sdk.gen';
import {useConfig, API_URL_DIRECT} from '@/composables/useConfig.ts';
import {useOrThrow} from '@/utils/useOrThrow';
import type {Client} from '@hey-api/client-fetch';
import {toValue, watch} from 'vue';

/**
 * Provides the API client instance with the correct configuration.
 */
export function useApiClient() {
  const {configuration} = useOrThrow(useConfig, 'useConfig');

  const configureClient = (): Client => {
    if (!configuration.value.apiUrl?.length) {
      console.error('Cannot init API: API URL is not set');
      return client;
    }

    if (
      !configuration.value.apiKey &&
      configuration.value.apiUrl === API_URL_DIRECT
    ) {
      console.error('An API key must be set when using the default API URL');
    }

    client.setConfig({
      baseUrl: configuration.value.apiUrl,
    });

    if (toValue(configuration.value.apiKey)?.length) {
      client.interceptors.request.use((request) => {
        // Send the API key as a base64 encoded bearer token as per https://developer.myparcel.nl/api-reference/05.authentication.html
        request.headers.set(
          'Authorization',
          `bearer ${btoa(<string>configuration.value.apiKey)}`,
        );
        return request;
      });
    }

    return client;
  };

  // Automatically update the client when the API key or URL changes
  watch(
    [() => configuration.value.apiKey, () => configuration.value.apiUrl],
    () => {
      configureClient();
    },
    {immediate: true, deep: true},
  );

  return {
    configureClient,
    client,
  };
}
