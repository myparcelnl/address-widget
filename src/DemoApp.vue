<template>
  <section>
    <header>
      <h2>Configuration</h2>
    </header>
    <textarea
      v-model="configAsJson"
      rows="10"
      class="w-full p-3"></textarea>
  </section>

  <section>
    <h2>Examples</h2>
    <pre>
      Herestraat 77
      9711 LC Groningen
    </pre>
  </section>

  <section class="p-4 flex flex-col space-y-4 max-w-80">
    <TheAddressWidget />
  </section>

  <section>
    <h2 class="font-bold">Address to be sent to MyParcel:</h2>
    <pre class="p-3 bg-slate-200 inline-block">{{
      selectedAddress ? selectedAddress : 'no address selected'
    }}</pre>
  </section>
</template>

<script setup="context" lang="ts">
import {ref, toValue, watch} from 'vue';
import TheAddressWidget from './components/TheAddressWidget.vue';
import {useAddressData} from './composables/useAddressData';
import {useConfig} from './composables/useConfig';

const {configuration, setConfig} = useConfig();
const configAsJson = ref(JSON.stringify(configuration, null, 2));
watch(configAsJson, (newVal) => {
  try {
    const parsed = JSON.parse(toValue(newVal));
    setConfig(parsed);
  } catch (e) {
    console.error(e);
  }
});

const selectedAddress = useAddressData().selectedAddress;
</script>
