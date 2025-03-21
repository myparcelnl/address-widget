<template>
  <section>
    <pre>
      Voorbeeld met toevoegingen:
      Herestraat 77
      9711 LC Groningen
    </pre>
  </section>

  <div class="p-4 flex flex-col space-y-4 max-w-80">
    <TheAddressWidget />
  </div>

  <section>
    <h2 class="font-bold">Address to be sent to MyParcel:</h2>
    <pre
      v-if="selectedAddress"
      class="p-3 bg-slate-200 inline-block"
      >{{ selectedAddress }}</pre
    >
  </section>
</template>

<script setup lang="ts">
import TheAddressWidget from './components/TheAddressWidget.vue';
import {useAddressData} from './composables/useAddressData';
const selectedAddress = useAddressData().selectedAddress;
</script>
