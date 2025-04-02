import {useConfig} from '@/composables/useConfig';
import {it, expect} from 'vitest';
import {useApiClient} from './useApiClient';

it('throws an error when the api url is not set', () => {
  // Set empty config
  const {configuration} = useConfig();
  configuration.apiUrl = '';
  expect(() => useApiClient()).toThrowError(
    'Cannot init API: API URL is not set',
  );
});

it('throws an error when the api key is not set and the api url is the default', () => {
  const {configuration} = useConfig();
  configuration.apiKey = '';
  configuration.apiUrl = 'https://address.api.myparcel.nl';
  expect(() => useApiClient()).toThrowError(
    'An API key must be set when using the default API URL',
  );
});

it('sets the base url on the client', () => {
  const {configuration} = useConfig();
  configuration.apiKey = '';
  configuration.apiUrl = 'https://foo-bar';

  const {client} = useApiClient();
  expect(client.getConfig().baseUrl).toBe('https://foo-bar');
});
