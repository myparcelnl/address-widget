import {client} from '@/api-client/sdk.gen';
import {useConfig} from '@/composables/useConfig.ts';
import {toValue} from 'vue';

export function useApiClient() {
  const {setConfigFromWindow, apiKey, apiUrl} = useConfig();

  setConfigFromWindow();

  if (!apiKey.value || !apiUrl.value) {
    throw new Error('Cannot init API: API key or API URL is not set');
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
