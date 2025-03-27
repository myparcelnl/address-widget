import {defaultPlugins, defineConfig} from '@hey-api/openapi-ts';

export default defineConfig({
  client: '@hey-api/client-fetch',
  input: 'https://address.api.myparcel.nl/openapi.json', // this is a public URL at this point
  output: 'src/api-client',
  experimentalParser: true,
  plugins: [...defaultPlugins, 'zod'],
});
