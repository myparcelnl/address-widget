import {vi, it, expect, describe, beforeEach} from 'vitest';
import {useApiClient} from './useApiClient';
import {withSetup} from '../../tests/withSetup';
import {useProvideConfig} from './useConfig';
import {nextTick} from 'vue';

describe('useApiClient', () => {
  let config: ReturnType<typeof useProvideConfig>;
  let apiClient: ReturnType<typeof useApiClient>;

  beforeEach(() => {
    [[config, apiClient]] = withSetup(useProvideConfig, useApiClient);
  });

  it('logs an error when the api url is not set', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Set empty config
    const {configuration} = config;
    configuration.apiUrl = '';

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(console.error).toHaveBeenCalledWith(
      'Cannot init API: API URL is not set',
    );
  });

  it('logs an error when the api key is not set and the api url is the default', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const {configuration} = config;
    configuration.apiKey = '';
    configuration.apiUrl = 'https://address.api.myparcel.nl';

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(console.error).toHaveBeenCalledWith(
      'An API key must be set when using the default API URL',
    );
  });

  it('does not an error when the api key is not set and the api url is the default', async () => {
    vi.spyOn(console, 'error').mockImplementation(() => {});

    const {configuration} = config;
    configuration.apiKey = 'anApiKey';
    configuration.apiUrl = 'https://address.api.myparcel.nl';

    expect(console.error).toBeCalledTimes(0);
  });

  it('sets the base url on the client', async () => {
    const {configuration} = config;
    configuration.apiKey = '';
    configuration.apiUrl = 'https://foo-bar';

    const {client} = apiClient;

    // Wait for the next tick, so the client is configured
    await nextTick();

    expect(client.getConfig().baseUrl).toBe('https://foo-bar');
  });
});
