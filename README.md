# address-widget

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (
and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we
replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we
need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to
make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Development

To get started, we recommend using [Volta](https://volta.sh) for Node
management.
It'll automatically make sure the right version of Node is used within our
projects.

### Prepare

1. Copy the `.env.example` file to `.env` and fill in the values.

### Setup

1. Run `yarn` to install dependencies.
2. Run `yarn translations:import` to download the translations.
3. The project is now ready to use.

### Running the Project

* Run `yarn serve` to start the development environment
* Run `yarn test` to run the tests

## Contributing

We suggest you use an editor with ESLint and Prettier support. This will help
you keep the code clean and consistent. Commits should follow the Conventional
Commits specification. You might want to install the `commitizen`-package to
help you with this.

Please read our [contribution guidelines](CONTRIBUTING.md).

## Installation

### Configuration

#### Environment Variables

You can use environment variables to compile the widget with your own config.
If you call the address API directly, this is the safest way to keep your API
key secret.

Just copy-paste the `.env.example` file to `.env` and fill in the values. Then,
build the widget with `yarn run build`.

#### Window Object

If you consume the widget via a script tag, you can pass the configuration via
the `window` object.
Doing this, however, will always expose your API key to the client. You should
use an API proxy to keep your key secret.

This widget does not contain such a proxy. However, it *is* included in our PDK
and our plugins. If you use one of those, or built your own proxy, you can use
it as follows:

```html

<script>
  window.MyParcelAddressConfig = {
    apiKey: 'your-api-key',
    apiUrl: 'https://your-api-proxy.com',
  };
</script>
```
