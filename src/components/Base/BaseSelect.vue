<template>
  <select v-model="model">
    <option
      v-for="option in computedOptions"
      :key="option.value"
      :value="option.value">
      {{ option.label }}
    </option>
  </select>
</template>

<script lang="ts" setup>
import {computed} from 'vue';

type SelectOptions = {
  options: {value: string; label: string}[];
  addEmptyOption?: boolean;
};

const props = withDefaults(defineProps<SelectOptions>(), {
  addEmptyOption: true,
});
const model = defineModel<string | null | undefined>({default: ''});

const computedOptions = computed(() => {
  if (props.addEmptyOption) {
    return [{value: '', label: 'Select an option'}, ...props.options];
  }
  return props.options;
});
</script>
