import {vi, it, expect, describe, beforeEach} from 'vitest';
import {useApiClient} from './useApiClient';
import {withSetup} from '../../tests/withSetup';
import {useProvideConfig} from './useConfig';
import {nextTick} from 'vue';

describe('useApiClient', () => {
  let config: ReturnType<typeof useProvideConfig>;
  let apiClient: ReturnType<typeof useApiClient>;

  beforeEach(() => {
    [[config, apiClient]] = withSetup(
      {composable: useProvideConfig},
      {composable: useApiClient},
    );
  });

  it('logs an error when the api url is not set', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Set empty config
    const {configuration} = config;
    configuration.value.apiUrl = '';

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(console.error).toHaveBeenCalledWith(
      'Cannot init API: API URL is not set',
    );
  });

  it('logs an error when the api key is not set and the api url is the default', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const {configuration} = config;
    configuration.value.apiKey = '';
    configuration.value.apiUrl = 'https://address.api.myparcel.nl';

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(console.error).toHaveBeenCalledWith(
      'An API key must be set when using the default API URL',
    );
  });

  it('does not throw an error when the api key is not set and the api url is the default', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const {configuration} = config;
    configuration.value.apiKey = 'anApiKey';
    configuration.value.apiUrl = 'https://address.api.myparcel.nl';

    expect(console.error).toBeCalledTimes(0);
  });

  it('sets the base url on the client', async () => {
    const {configuration} = config;
    configuration.value.apiKey = '';
    configuration.value.apiUrl = 'https://foo-bar';

    const {client} = apiClient;

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(client.getConfig().baseUrl).toBe('https://foo-bar');
  });

  it('allows overriding the path and query params', async () => {
    const {configuration} = config;
    const originalOptions = {
      query: {
        bar: 'baz',
      },
      baseUrl: 'https://addres.api.myparcel.nl',
      url: '/adresses',
    };
    const originalRequest = new Request(
      'https://addres.api.myparcel.nl/adresses',
    );
    configuration.value.apiRequestOptions = {
      '/adresses': {
        query: {
          foo: 'bar',
        },
        path: '/',
      },
    };

    const {overrideRequestOptions} = apiClient;
    const modifiedRequest = overrideRequestOptions(
      originalRequest,
      originalOptions,
    );

    expect(modifiedRequest.url).toBe(
      'https://addres.api.myparcel.nl/?bar=baz&foo=bar',
    );
  });
});
