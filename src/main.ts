import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createClient } from 'villus';

import App from './App.vue'
import '../index.css'

const app = createApp(App)

app.use(createPinia())

const client = createClient({
  url: 'https://graphqlzero.almansi.me/api', // your endpoint.
});

app.use(client);

app.mount('#app')
