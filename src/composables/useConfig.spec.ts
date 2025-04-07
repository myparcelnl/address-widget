import {useConfig} from '@/composables/useConfig';
import {describe} from 'node:test';
import {it, expect, vi, beforeEach} from 'vitest';
import {toValue} from 'vue';
import {useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';

describe('useConfig', () => {
  let config: ReturnType<typeof useProvideConfig>;
  beforeEach(() => {
    [[config]] = withSetup(useProvideConfig);
  });

  it('logs an errror but does not stop when given empty config objects', () => {
    const {setConfig} = config;
    // Spy on the console...
    console.error = vi.fn();

    expect(() => setConfig({})).not.toThrowError();
    // Check there is an error in console
    expect(console.error).toHaveBeenCalledWith(
      'Invalid configuration:',
      expect.objectContaining({
        message: expect.stringContaining('Required'),
      }),
    );
  });

  it('only sets a valid country code', () => {
    const {setConfig, country} = config;
    const input = {
      apiUrl: 'https://foo-bar',
      country: 'NOTACOUNTRY',
    };
    expect(() => setConfig(input)).not.toThrowError();
    expect(toValue(country)).toBe(undefined);

    input.country = 'NL';
    setConfig(input);
    expect(toValue(country)).toBe('NL');
  });

  it('sets valid data from the config object', () => {
    const {setConfig, apiKey, apiUrl, country} = config;
    const input = {
      apiKey: 'FUBAR',
      apiUrl: 'https://foo-bar',
      country: 'DK',
    };
    setConfig(input);
    expect(toValue(apiKey)).toBe(input.apiKey);
    expect(toValue(apiUrl)).toBe(input.apiUrl);
    expect(toValue(country)).toBe(input.country);
  });

  it('sets valid data from the window object', () => {
    const {setConfigFromWindow, apiKey, apiUrl, country} = config;
    const input = {
      apiKey: 'FUBAR',
      apiUrl: 'https://foo-bar',
      country: 'DK',
    };

    window.MyParcelAddressConfig = input;
    setConfigFromWindow();
    expect(toValue(apiKey)).toBe(input.apiKey);
    expect(toValue(apiUrl)).toBe(input.apiUrl);
    expect(toValue(country)).toBe(input.country);
  });
});
