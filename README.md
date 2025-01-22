# MyParcel Address Widget

This package provides a UI implementation which connects with the [MyParcel Address API](https://developer.myparcel.nl/). This provides a way to easily integrate the address validation and autocomplete functionality into your webshop.
The Address Widget is, or will be, included in our plugins and PDK. Please refer to this readme on how to include it in your own project if you don't use one of those.

> [!NOTE]  You need an active MyParcel account and API key to be able to use this package.

## Usage
The following instructions will help you to include the Address Widget in your project. Note there are various ways to include the widget, depending on your needs and not all of them are covered here.

### CDN
You can include the widget via a script tag. This is the easiest way to include the widget in your project.
```html
<body>
  <div id="myparcel-address-widget"></div>
  <script src="https://cdn.jsdelivr.net/npm/@myparcel/address-widget"></script>
</body>
```

### Using a package manager
You can also include the widget in your project by installing it via a package manager. This is the recommended way to include the widget in your project and gives you the most control.
```bash
yarn add @myparcel/address-widget
```

<!-- You can configure the widget by passing the configuration object to the `AddressWidget` constructor. The configuration object should contain the following properties: -->

### Configuration

#### Window Object
If you consume the widget via a script tag, you can pass the configuration via the `window` object.
Doing this, however, will always expose your API key to the client. You should use an API proxy to keep your key secret.

Example:
```html
<script>
  window.MyParcelAddressConfig = {
    apiKey
  };
</script>
```

> [!DANGER] This will expose your API key to anyone visiting your website. You should only use this method for local testing purposes. You should use a proxy server to keep your API key secret.

Example using a proxy server:
```html
<script>
  window.MyParcelAddressConfig = {
      apiUrl: 'https://your-api-proxy.com',
    };
</script>
```

#### Javascript API
If you include the widget in your project using a package manager, you can configure the widget by passing the configuration object to the `AddressWidget` constructor. The configuration object should contain the following properties:

```javascript
import { AddressWidget } from '@myparcel/address-widget';
AddressWidget({
  apiKey: process.env.MYPARCEL_API_KEY,
});
```
> [!WARNING] While this method is more secure than using the `window` object, it is still not recommended to use this method in a production environment. You should use a proxy server to keep your API key secret.

Example using a proxy:
```javascript
import { AddressWidget } from '@myparcel/address-widget';
AddressWidget({
    apiUrl: 'https://your-api-proxy.com',
});
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

* Run `yarn dev` to start the development environment
* Run `yarn test` to run the tests
* Run `yarn preview` to run the project in a production-like environment (also used for the demo environment)

### CLI reference

#### Project Setup

```sh
yarn install
```

#### Compile and Hot-Reload for Development

```sh
yarn run dev
```

#### Build and start a preview/demo server for the production build

```sh
yarn run preview
```

#### Type-Check, Compile and Minify for Production

```sh
yarn run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
yarn run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
yarn run lint
```


## Contributing

We suggest you use an editor with ESLint and Prettier support. This will help
you keep the code clean and consistent. Commits should follow the Conventional
Commits specification. You might want to install the `commitizen`-package to
help you with this.

Please read our [contribution guidelines](CONTRIBUTING.md).
