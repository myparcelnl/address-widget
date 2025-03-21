import type {ConfigObject} from '@/composables/useConfig';

declare global {
  export interface Window {
    MyParcelAddressConfig?: ConfigObject;
  }
}

export {};
