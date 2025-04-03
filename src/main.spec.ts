import {beforeEach, expect, it} from 'vitest';
let exports;

beforeEach(async () => {
  exports = await import('./main');
});

it('exports an uninitialized app', () => {
  expect(exports.default).toBeDefined();
  // Basic checks to see if this is a vue app-like object
  expect(exports.default.render).toBeDefined();
  expect(exports.default.__name).toBeDefined();
});

it('exports the name of the address selected event', () => {
  expect(exports.ADDRESS_SELECTED_EVENT).toBeDefined();
});

it('does not share state between multiple instances', () => {
  // const app1: typeof App = exports.default;
  // const app2: typeof App = exports.default;
  // Set some address data
  // TODO: Can be done once the app responds to config change events
});
