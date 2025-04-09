# MyParcel Address Widget

This package provides a UI implementation which connects with the [MyParcel Address API](https://address.api.myparcel.nl/openapi.yaml). This provides a way to easily integrate the address validation and autocomplete functionality into your webshop.
The Address Widget is, or will be, included in our plugins and PDK. Please refer to this readme on how to include it in your own project if you don't use one of those.

> [!NOTE] You need an active MyParcel account and API key to be able to use this package.

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
pnpm add @myparcel/address-widget
```

```bash
yarn add @myparcel/address-widget
```

### Configuration

#### Using events

Even though you can initialize the config using the methods below, you will probably need to update some information in the widget after it has been initialized.

You can dispatch the `CONFIGURATION_UPDATE_EVENT` from your code whenever something in your application changes. This will update the widget with the new configuration.

If you provide a partial config object, only the properties that are present in the object will be updated. To specifically unset a property, you can set it to `null`.

```js
import {CONFIGURATION_UPDATE_EVENT} from '@myparcel/address-widget';

const myConfig = {
  apiUrl: 'https://my-webshop.nl/proxy-api',
}

changeCountry = (country) => {
  const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
    detail: {
      config: {
      ...myConfig
      country,
      }
    },
  });
  document.dispatchEvent(event);
};
```

##### App identifier

In order to be able to add multiple instances of the widget on one page, you may optionally provide an appIdentifier to your config to only update that instance of it.

```js
import {CONFIGURATION_UPDATE_EVENT} from '@myparcel/address-widget';

const myConfig = {
  apiUrl: 'https://my-webshop.nl/proxy-api',
  appIdentifier: 'my-app-identifier',
};

changeCountry = (country) => {
  const event = new CustomEvent(CONFIGURATION_UPDATE_EVENT, {
    detail: {
      appIdentifier: myConfig.appIdentifier,
      config: {
        country,
      },
    },
  });
  document.dispatchEvent(event);
};
```

#### Window Object

If you consume the widget via a script tag, you can pass the configuration via the `window` object. You currently cannot choose a country within the widget itself, you need to pass it as a configuration option. When the country is not set, the widget will default to the Netherlands. Other countries are not supported at this time and setting them will hide the widget.

Doing this, however, will always expose your API key to the client. You should use an API proxy to keep your key secret.

Example:

```html
<script>
  window.MyParcelAddressConfig = {
    apiKey: 'MY_API_KEY',
    country: 'NL',
  };
</script>
```

> [!DANGER] This will expose your API key to anyone visiting your website. You should only use this method for local testing purposes. You should use a proxy server to keep your API key secret.

Example using a proxy server:

```html
<script>
  window.MyParcelAddressConfig = {
    apiUrl: 'https://your-api-proxy.com',
    country: 'NL',
  };
</script>
```

#### Javascript API

If you include the widget in your project using a package manager, you can configure the widget by passing the configuration object to the `TheAddressWidget` component. The configuration object should contain the following properties:

```vue
<script>
import {TheAddressWidget} from '@myparcel/address-widget';
</script>
<template>
  <TheAddressWidget :config="{apiKey: 'MY_API_KEY', country: 'NL'}" />
</template>
```

> [!WARNING] While this method is more secure than using the `window` object, it is still not recommended to use this method in a production environment. You should use a proxy server to keep your API key secret.

Example using a proxy:

```vue
<script>
import {TheAddressWidget} from '@myparcel/address-widget';
</script>
<template>
  <TheAddressWidget
    :config="{apiUrl: 'https://my-webshop.com/proxy-api', country: 'NL'}" />
</template>
```

### Implementation

The widget is a Vue component and can be used in both Vue and non-Vue projects. It is intended to be injected in an existing form, where you would need to add a collection point for the data emitted by this widget.
The most important event emitted is `adress-selected`, which contains the validated address data.

Some examples on how to listen to these events and use the emitted data:

#### Vue

```vue
<template>
  <h2>My checkout form</h2>
  <form @submit.prevent="doSubmit">
    <input
      type="text"
      name="name"
      placeholder="Name" />
    <input
      type="text"
      name="phone"
      placeholder="Phone number" />

    <h3>Shipping address</h3>
    <TheAddressWidget @address-selected="setShippingAddress" />

    <h3>Billing address</h3>
    <input
      type="checkbox"
      name="syncShipmentAndBilling"
      id="syncShipmentAndBilling"
      v-model="syncShipmentAndBilling" />
    <label for="syncShipmentAndBilling">Use the same address for billing</label>
    <TheAddressWidget
      @address-selected="setBillingAddress"
      v-if="!syncShipmentAndBilling" />

    <button type="submit">Submit</button>
  </form>
</template>

<script setup>
import {ref} from 'vue';
import {TheAddressWidget} from '@myparcel/address-widget';
import {type Address} from '@myparcel/address-widget';

const syncShipmentAndBilling = ref(false);
const billingAddress<Address> = ref(null);
const shippingAddress<Address> = ref(null);

const setShippingAddress = (data: Address) => {
  shippingAddress.value = data;
  if (syncShipmentAndBilling.value) {
    setBillingAddress(data);
  }
};
const setBillingAddress = (data: Address) => {
  setBillingAddress.value = data;
};
const = doSubmit = () => {
  // Reject if the addresses are not filled in
  if (!shippingAddress.value || !billingAddress.value) {
    return;
  }
  // Do something with the addresses
  fetch('/my-api-implementation/checkout', {
    method: 'POST',
    body: JSON.stringify({
      shippingAddress: shippingAddress.value,
      billingAddress: billingAddress.value,
    }),
  });
};
</script>
```

## Vanilla JS / HTML

### HTML

```html
<html lang="en">
  <body>
    <h1>My checkout form</h1>
    <form
      target="/my-php-backend/checkout"
      method="POST">
      <input
        type="text"
        name="name"
        placeholder="Name" />
      <input
        type="text"
        name="phone"
        placeholder="Phone number" />

      <h2>Shipping address</h2>
      <input
        type="hidden"
        name="shippingAddress"
        id="shippingAddress" />

      <!-- The widget will be displayed here, see javascript below! -->
      <div id="shipping-address-widget"></div>

      <h2>Billing address</h2>
      <input
        type="checkbox"
        name="syncShipmentAndBilling"
        id="syncShipmentAndBilling" />
      <label for="syncShipmentAndBilling">
        Use the same address for billing
      </label>

      <input
        type="hidden"
        name="billingAddress"
        id="billingAddress" />
      <!-- The widget will be displayed here, see javascript below! -->
      <div id="billing-address-widget"></div>

      <button type="submit">Submit</button>
    </form>
    <!-- Adding vue is required -->
    <script src="https://cdn.jsdelivr.net/npm/vue@3"></script>
    <script src="https://cdn.jsdelivr.net/npm/@myparcel/address-widget"></script>
    <script src="./my-script.js"></script>
  </body>
</html>
```

### my-script.js

```js
import {
  default as TheAddressWidget,
  ADDRESS_SELECTED_EVENT,
} from '@myparcel/address-widget';
const SHIPPING_ID = 'shipping-address-widget';
const BILLING_ID = 'billing-address-widget';

// Define a reusable factory function so we can have multiple apps
const app = () => Vue.createApp(TheAddressWidget);

// Mount on shipping
app().mount(SHIPPING_ID);
// Mount on billing
app().mount(BILLING_ID);

// Listen for changes to the address
document.addEventListener(ADDRESS_SELECTED_EVENT, (event) => {
  const address = event.detail;
  // Check which widget was changed
  if (event.target.id === SHIPPING_ID) {
    // Load the address into a a hidden input. This assumes some backend script, like PHP, will handle the data when the form is submitted.
    document.getElementById('shippingAddress').value = JSON.stringify(address);
    if (document.getElementById('syncShipmentAndBilling').checked) {
      document.getElementById('billingAddress').value = JSON.stringify(address);
    }
  } else if (event.target.id === BILLING_ID) {
    document.getElementById('billingAddress').value = JSON.stringify(address);
  }
});
```

## Contributing

To get started, we recommend using [nvm](https://github.com/nvm-sh/nvm) for Node
management.

Before running node commands, you should run `nvm use` to switch to the correct
node version.

This repository uses [pnpm](https://pnpm.io/) as a package manager. The easiest way
to use / install it, is by enabling corepack: `corepack enable`, after running `nvm use`.

## First time setup

1. `nvm use`
2. `corepack enable`
3. `pnpm i`

### Prepare

1. Copy the `.env.example` file to `.env` and fill in the values.

### Setup

1. Run `pnpm i` to install dependencies.
2. Run `pnpm run translations:import` to download the translations.
3. The project is now ready to use.

### Running the Project

- Run `pnpm dev` to start the development environment
- Run `pnpm test` to run the tests
- Run `pnpm preview` to run the project in a production-like environment (also used for the demo environment)

### CLI reference

#### Project Setup

```sh
pnpm i
```

#### Compile and Hot-Reload for Development

```sh
pnpm run dev
```

#### Build and start a preview/demo server for the production build

```sh
pnpm run preview
```

#### Type-Check, Compile and Minify for Production

```sh
pnpm run build
```

#### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
pnpm run test:unit
```

#### Lint with [ESLint](https://eslint.org/)

```sh
pnpm run lint
```

## Contributing

We suggest you use an editor with ESLint and Prettier support. This will help
you keep the code clean and consistent. Commits should follow the Conventional
Commits specification. You might want to install the `commitizen`-package to
help you with this.

Please read our [contribution guidelines](CONTRIBUTING.md).
