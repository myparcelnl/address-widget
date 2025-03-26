import {beforeAll, afterEach, afterAll} from 'vitest';
import {server} from './mocks/requests/node';

beforeAll(() => {
  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});
