import {createApp} from 'vue';
// import { createPinia } from 'pinia'
import App from './App.vue';

const app = createApp(App);

// app.use(createPinia())

// TODO: inject optional user configurable wrapper
app.mount('#form');

export default app;
