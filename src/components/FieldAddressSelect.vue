<template>
  <BaseFieldWrapper>
    <label :for="getFieldName()">Select the right address</label>
    <BaseSelect
      :id="getFieldName()"
      :name="getFieldName()"
      :options="addressOptions"
      @input="onSelect" />
  </BaseFieldWrapper>
</template>

<script setup lang="ts">
import type {Address} from '@/api-client';
import {defineEmits, computed} from 'vue';
import BaseSelect from './Base/BaseSelect.vue';
import BaseFieldWrapper from '@/components/Base/BaseFieldWrapper.vue';
import {useFieldName} from '@/composables/useFieldName';
defineOptions({
  inheritAttrs: false,
});
const props = defineProps<{
  addresses: Address[];
}>();

const emit = defineEmits<{
  (e: 'address-select', selectedAddress: Address): void;
}>();

const {getFieldName} = useFieldName('addressSelect');

const addressOptions = computed(() => {
  return props.addresses.map((address, index) => ({
    value: index.toString(),
    label: `${address.street} ${address.houseNumber}${address.houseNumberSuffix || ''}, ${address.city}`,
  }));
});

const onSelect = (e: InputEvent) => {
  const target = e.target as HTMLSelectElement;
  if (!target.value) return;

  // Get address by index and emit it
  const selectedIndex = parseInt(target.value);
  const selectedAddress = props.addresses[selectedIndex];
  emit('address-select', selectedAddress);
};
</script>
