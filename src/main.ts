/**
 * This is the main module file used to export the Vue app and any functionality that should be available to the consuming application.
 */
import App from './App.vue';
import {ADDRESS_SELECTED_EVENT} from './composables/useOutgoingEvents';

export default App;

// Additional exports for typing etc.
export {ADDRESS_SELECTED_EVENT};
