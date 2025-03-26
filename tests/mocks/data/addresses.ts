import type {Address} from '@/api-client/types.gen';

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
