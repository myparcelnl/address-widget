<template>
  <section>
    <header>
      <h2>Configuration</h2>
    </header>
    <BaseTextArea
      v-model="configAsJson"
      rows="10"
      class="w-lg p-3"></BaseTextArea>
  </section>

  <section>
    <h2>Examples</h2>
    <pre>
      Herestraat 77
      9711 LC Groningen
    </pre>
  </section>

  <section class="p-4 flex flex-col space-y-4 max-w-80">
    <TheAddressWidget :config="configFromJson" />
  </section>

  <section>
    <h2 class="font-bold">Address to be sent to MyParcel:</h2>
    <pre class="p-3 bg-slate-200 inline-block">{{
      selectedAddress ? selectedAddress : 'no address selected'
    }}</pre>
  </section>
</template>

<script setup="context" lang="ts">
import './styles/base.css';
import {computed, ref, type ComputedRef} from 'vue';
import TheAddressWidget from './components/TheAddressWidget.vue';
import {useProvideAddressData} from './composables/useAddressData';
import {useProvideConfig, type ConfigObject} from './composables/useConfig';
import BaseTextArea from './components/Base/BaseTextArea.vue';
import {useProvideAddressApi} from './composables/useAddressApi';

// Provide global injection states, sharing data between components
const {configuration} = useProvideConfig();
const {selectedAddress} = useProvideAddressData();
useProvideAddressApi();

configuration.value.address = {countryCode: 'NL'};
const configAsJson = ref(JSON.stringify(configuration.value, null, 2));

const configFromJson: ComputedRef<ConfigObject> = computed(() => {
  try {
    return JSON.parse(configAsJson.value);
  } catch (e) {
    console.error('Invalid JSON:', e);
    return configuration;
  }
});
</script>
