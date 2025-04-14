/**
 * This is the main module file used to export the Vue app and any functionality that should be available to the consuming application.
 */
import App from './App.vue';
import {ADDRESS_SELECTED_EVENT} from './composables/useOutgoingEvents';
import {CONFIGURATION_UPDATE_EVENT} from './composables/useIncomingEvents';

export default App;

// Additional exports for typing etc.
export {ADDRESS_SELECTED_EVENT, CONFIGURATION_UPDATE_EVENT};

// Export the types from our composables
export type * from './composables/useAddressApi';
export type * from './composables/useAddressData';
export type * from './composables/useApiClient';
export type * from './composables/useConfig';
export type * from './composables/useIncomingEvents';
export type * from './composables/useHandleUserInput';
export type * from './composables/useOutgoingEvents';
export type * from './api-client/types.gen';
