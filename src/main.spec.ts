import {beforeEach, expect, it} from 'vitest';
let exports;

beforeEach(async () => {
  exports = await import('./main');
});

it('exports the app', () => {
  expect(exports.default).toBeDefined();
  // Basic checks to see if this is a vue app-like object
  expect(exports.default._context).toBeDefined();
  expect(exports.default.mount).toBeDefined();
});

it('exports the name of the address selected event', () => {
  expect(exports.ADDRESS_SELECTED_EVENT).toBeDefined();
});
