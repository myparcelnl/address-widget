/**
 * This is the application file used to mount the full Vue app to the DOM. Mostly for demo purposes.
 */
import {createApp} from 'vue';
import App from './DemoApp.vue';

const app = createApp(App);

app.mount('#form');
