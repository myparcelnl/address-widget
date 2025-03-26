/**
 * This is the main module file used to export the Vue app and any functionality that should be available to the consuming application.
 */
import {createApp} from 'vue';
import App from './App.vue';

const app = createApp(App);
export default app;

// Additional exports for typing etc.
export * from './composables/useConfig';
export * from './composables/useAddressData';
