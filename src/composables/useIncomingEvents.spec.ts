import {useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';
import {useIncomingEvents} from './useIncomingEvents';
import {describe, expect, it, vi} from 'vitest';
import {toValue} from 'vue';
import {nextTick} from 'vue';

describe('useIncomingEvents', () => {
  it('should handle configuration update events', async () => {
    const [[config]] = withSetup(useProvideConfig, useIncomingEvents);

    const event = new CustomEvent('configuration-update', {
      detail: {
        appIdentifier: 'test-app',
        apiUrl: 'https://api.example.com',
      },
    });

    // Verify event was handled
    document.dispatchEvent(event);

    await nextTick();

    // Check the config was changed
    expect(toValue(config.apiUrl)).toBe('https://api.example.com');
    expect(toValue(config.appIdentifier)).toBe('test-app');
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
        appIdentifier: 'test-app',
        apiUrl: null,
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
});
