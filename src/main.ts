/**
 * This is the main module file used to export the Vue app and any functionality that should be available to the consuming application.
 */
import {createApp} from 'vue';
import i18n from "@/i18n.ts";
import App from './App.vue';

const app = createApp(App);

app.use(i18n);

export default app;

// Additional exports for typing etc.
export * from './composables/useConfig';
export * from './composables/useAddressData';
