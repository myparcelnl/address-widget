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
    const {setConfig, configuration} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({address: {countryCode: 'DK'}});
    expect(toValue(configuration).address.countryCode).toBe('DK');

    expect(() => setConfig({})).not.toThrowError();
    expect(toValue(configuration).address.countryCode).toBe('DK');
  });

  it('retains values when given empty partial config objects', () => {
    const {setConfig, configuration} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({address: {countryCode: 'DK'}});
    expect(toValue(configuration).address.countryCode).toBe('DK');
    expect(toValue(configuration).apiKey).toBeUndefined();

    expect(() => setConfig({apiKey: 'FUBAR'})).not.toThrowError();
    expect(toValue(configuration).address.countryCode).toBe('DK');
    expect(toValue(configuration).apiKey).toBe('FUBAR');
  });

  it('allows emptying optional config', () => {
    const {setConfig, configuration} = config;
    // Spy on the console...
    console.error = vi.fn();

    setConfig({apiKey: 'ABCD'});
    expect(toValue(configuration).apiKey).toBe('ABCD');

    expect(() => setConfig({apiKey: null})).not.toThrowError();
    expect(toValue(configuration).apiKey).toBeNull();
  });

  it('only sets a valid country code', () => {
    const {setConfig, configuration} = config;
    const input = {
      apiUrl: 'https://foo-bar',
      address: {countryCode: 'NOTACOUNTRY'},
    };
    expect(() => setConfig(input)).not.toThrowError();
    expect(toValue(configuration).address?.countryCode).toBe(undefined);

    input.address.countryCode = 'NL';
    setConfig(input);
    expect(toValue(configuration).address?.countryCode).toBe('NL');
  });

  it('sets valid data from the config object', () => {
    const {setConfig, configuration} = config;
    const input = {
      apiKey: 'FUBAR',
      apiUrl: 'https://foo-bar',
      address: {countryCode: 'DK'},
    };
    setConfig(input);
    expect(toValue(configuration).apiKey).toBe(input.apiKey);
    expect(toValue(configuration).apiUrl).toBe(input.apiUrl);
    expect(toValue(configuration).address.countryCode).toBe(
      input.address.countryCode,
    );
  });

  it('sets valid data from the window object', () => {
    const {setConfigFromWindow, configuration} = config;
    const input = {
      apiKey: 'FUBAR',
      apiUrl: 'https://foo-bar',
      address: {countryCode: 'DK'},
    };

    window.MyParcelAddressConfig = input;
    setConfigFromWindow();
    expect(toValue(configuration).apiKey).toBe(input.apiKey);
    expect(toValue(configuration).apiUrl).toBe(input.apiUrl);
    expect(toValue(configuration).address.countryCode).toBe(
      input.address.countryCode,
    );
  });
});
