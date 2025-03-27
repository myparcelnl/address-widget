import {useConfig} from '@/composables/useConfig';
import {it, expect} from 'vitest';
import {toValue} from 'vue';

it('rejects empty config objects', () => {
  const {setConfig} = useConfig();
  expect(() => setConfig({})).toThrowError();
});

it('required a valid country code', () => {
  const {setConfig, country} = useConfig();
  const input = {
    apiUrl: 'https://foo-bar',
    country: 'NOTACOUNTRY',
  };
  expect(() => setConfig(input)).toThrowError();

  input.country = 'NL';
  setConfig(input);
  expect(toValue(country)).toBe('NL');
});

it('sets valid data from the config object', () => {
  const {setConfig, apiKey, apiUrl, country} = useConfig();
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
  const {setConfigFromWindow, apiKey, apiUrl, country} = useConfig();
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
