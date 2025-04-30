import {API_URL_DIRECT, useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';
import {
  CONFIGURATION_UPDATE_EVENT,
  useIncomingEvents,
} from './useIncomingEvents';
import {describe, expect, it, vi} from 'vitest';
import {toValue} from 'vue';
import {nextTick} from 'vue';

describe('useIncomingEvents', () => {
  it('should handle configuration update events', async () => {
    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );

    const configuration = config.configuration;
    const event = new CustomEvent('configuration-update', {
      detail: {
        config: {
          appIdentifier: 'test-app',
          apiUrl: 'https://api.example.com',
        },
      },
    });

    // Verify event was handled
    document.dispatchEvent(event);

    await nextTick();

    // Check the config was changed
    expect(toValue(configuration).apiUrl).toBe('https://api.example.com');
    expect(toValue(configuration).appIdentifier).toBe('test-app');
  });

  it('should ignore configuration update events for different appIdentifier', async () => {
    const consoleInfoSpy = vi
      .spyOn(console, 'info')
      .mockImplementation(() => {});

    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;

    configuration.value.appIdentifier = 'test-app';

    const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
      detail: {
        appIdentifier: 'test-app',
        config: {
          apiUrl: 'https://api.example.com',
        },
      },
    });
    const event2 = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
      detail: {
        appIdentifier: 'other-app',
        config: {
          apiUrl: 'https://someotherapi.example.com',
        },
      },
    });

    document.dispatchEvent(event);
    document.dispatchEvent(event2);

    // Check it was ignored
    expect(consoleInfoSpy).toHaveBeenCalledWith(
      'Ignoring configuration update for appIdentifier other-app, current appIdentifier is test-app',
    );
    consoleInfoSpy.mockRestore();

    await nextTick();

    // Check the config was not changed
    expect(toValue(configuration).apiUrl).toBe('https://api.example.com');
    expect(toValue(configuration).appIdentifier).toBe('test-app');
  });

  it('should always set config when no appIdentifier is configured', async () => {
    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;
    expect(toValue(configuration).apiUrl).toBe(API_URL_DIRECT);

    document.dispatchEvent(
      new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
        detail: {
          config: {
            apiUrl: 'https://api.example.com',
          },
        },
      }),
    );

    expect(toValue(configuration).apiUrl).toBe('https://api.example.com');
  });

  it('should update the appIdentifier when set', async () => {
    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;
    configuration.value.appIdentifier = 'old-app';
    expect(toValue(configuration).appIdentifier).toBe('old-app');

    document.dispatchEvent(
      new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
        detail: {
          appIdentifier: 'old-app',
          config: {
            appIdentifier: 'test-app',
          },
        },
      }),
    );

    expect(toValue(configuration).appIdentifier).toBe('test-app');
  });

  it('should reject updates without an appIdentifier, if one was configured', () => {
    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;
    configuration.value.appIdentifier = 'test-app';

    const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
      detail: {
        config: {
          apiUrl: 'https://api.example.com',
        },
      },
    });

    document.dispatchEvent(event);

    expect(toValue(configuration).apiUrl).toBe(API_URL_DIRECT);
  });

  it('does not update when an appIdentifier is provided in the event but not in the config', () => {
    const consoleSpy = vi.spyOn(console, 'info').mockImplementation(() => {});

    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;
    expect(toValue(configuration).appIdentifier).toBeUndefined();
    expect(toValue(configuration).apiUrl).toBe(API_URL_DIRECT);

    const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
      detail: {
        appIdentifier: 'my-app',
        config: {
          apiUrl: 'https://api.example.com',
        },
      },
    });
    document.dispatchEvent(event);

    expect(consoleSpy).toHaveBeenCalledWith(
      'Ignoring configuration update for appIdentifier my-app, current appIdentifier is undefined',
    );
    expect(toValue(configuration).apiUrl).toBe(API_URL_DIRECT);
    expect(toValue(configuration).appIdentifier).toBeUndefined();
    consoleSpy.mockRestore();
  });

  it('should log an error for invalid event types', () => {
    const event = new Event('configuration-update');
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    document.dispatchEvent(event);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid event type for configuration update',
    );
    consoleErrorSpy.mockRestore();
  });

  it('should log an error for invalid event payloads', () => {
    const event = new CustomEvent('configuration-update', {
      detail: {
        config: {
          appIdentifier: 'test-app',
          apiUrl: null,
        },
      },
    });
    const consoleErrorSpy = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    document.dispatchEvent(event);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      'Invalid configuration:',
      expect.objectContaining({
        message: expect.stringContaining('Expected string'),
      }),
    );
    consoleErrorSpy.mockRestore();
  });

  it('should set an address provided through configuration update', () => {
    const [[config]] = withSetup(
      {composable: useProvideConfig},
      {composable: useIncomingEvents},
    );
    const configuration = config.configuration;

    const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
      detail: {
        config: {
          apiUrl: 'https://api.example.com',
          address: {
            postalCode: '1234AB',
            houseNumber: '1',
            houseNumberSuffix: 'A',
            street: 'Main St',
            city: 'Amsterdam',
            countryCode: 'NL',
          },
        },
      },
    });

    document.dispatchEvent(event);

    expect(toValue(configuration).address).toEqual({
      postalCode: '1234AB',
      houseNumber: '1',
      houseNumberSuffix: 'A',
      street: 'Main St',
      city: 'Amsterdam',
      countryCode: 'NL',
    });
  });
});
