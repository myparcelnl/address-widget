import type {Address} from '@/api-client/types.gen';
import type {getAddresses} from '@/api-client';

export const MOCK_ADDRESSES: Address[] = [
  {
    postalCode: '1234AB',
    houseNumber: '1',
    street: 'Main St',
    city: 'Amsterdam',
    countryCode: 'NL',
    postOfficeBox: false,
  },
  {
    postalCode: '5678CD',
    houseNumber: '2',
    street: 'Second St',
    city: 'Rotterdam',
    countryCode: 'NL',
    postOfficeBox: false,
  },
];

// Mock implementation of getAddresses with correct types
export const getAddressesMock = (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ...args: Parameters<typeof getAddresses>
): ReturnType<typeof getAddresses> => {
  // Emulate a brief delay befor resovling the promise
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          results: MOCK_ADDRESSES,
        },
        request: new Request('http://localhost:3000/addresses'),
        response: new Response(JSON.stringify(MOCK_ADDRESSES), {status: 200}),
      });
    }, 100);
  });
};
