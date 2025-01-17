import {client} from '@/api-client/sdk.gen';
import {useConfig, API_URL_DIRECT} from '@/composables/useConfig.ts';
import {toValue} from 'vue';

export function useApiClient() {
  const {setConfigFromWindow, apiKey, apiUrl} = useConfig();

  setConfigFromWindow();

  if (!apiUrl.value?.length) {
    throw new Error('Cannot init API: API URL is not set');
  }

  if (!apiKey.value && apiUrl.value === API_URL_DIRECT) {
    throw new Error('An API key must be set when using the default API URL');
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

  return {
    client,
  };
}
