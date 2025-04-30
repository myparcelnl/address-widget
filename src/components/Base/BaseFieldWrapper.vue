<template>
  <div :class="configuration.classNames?.fieldWrapper?.join(' ')">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {useConfig} from '@/composables/useConfig';
import {useOrThrow} from '@/utils/useOrThrow';

const {configuration} = useOrThrow(useConfig, 'useConfig');
</script>
