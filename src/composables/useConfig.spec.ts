import {describe} from 'node:test';
import {it, expect, vi, beforeEach} from 'vitest';
import {toValue} from 'vue';
import {useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';

describe('useConfig', () => {
  let config: ReturnType<typeof useProvideConfig>;
  beforeEach(() => {
    [[config]] = withSetup({composable: useProvideConfig});
  });

  it('retains values when given empty config objects', () => {
    const {setConfig} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({country: 'DK'});
    expect(toValue(config.country)).toBe('DK');

    expect(() => setConfig({})).not.toThrowError();
    expect(toValue(config.country)).toBe('DK');
  });

  it('retains values when given empty partial config objects', () => {
    const {setConfig} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({country: 'DK'});
    expect(toValue(config.country)).toBe('DK');
    expect(toValue(config.apiKey)).toBeUndefined();

    expect(() => setConfig({apiKey: 'FUBAR'})).not.toThrowError();
    expect(toValue(config.country)).toBe('DK');
    expect(toValue(config.apiKey)).toBe('FUBAR');
  });

  it('allows emptying optional config', () => {
    const {setConfig} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({apiKey: 'ABCD'});
    expect(toValue(config.apiKey)).toBe('ABCD');

    expect(() => setConfig({apiKey: null})).not.toThrowError();
    expect(toValue(config.apiKey)).toBeNull();
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
