<template>
  <component
    :is="element"
    :class="configuration.classNames?.fieldWrapper?.join(' ')">
    <slot></slot>
  </component>
</template>

<script lang="ts" setup>
import {computed} from 'vue';
import {useConfig} from '@/composables/useConfig';
import {useOrThrow} from '@/utils/useOrThrow';

const {configuration} = useOrThrow(useConfig, 'useConfig');
const element = computed(
  () => configuration.value.elements?.fieldWrapper ?? 'div',
);
</script>
