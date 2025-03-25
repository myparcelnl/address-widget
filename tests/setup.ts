import {vi} from 'vitest';
import {getAddressesMock} from './mockApi';

// Whenever getAddresses from the generated sdk is called, use a mock instead
vi.mock('@/api-client', async (importOriginal) => {
  return {
    ...(await importOriginal<typeof import('@/api-client')>()),
    getAddresses: getAddressesMock,
  };
});
