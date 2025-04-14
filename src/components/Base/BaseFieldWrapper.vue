<template>
  <div :class="classNames?.fieldWrapper?.join(' ')">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
import {useConfig} from '@/composables/useConfig';
import {useOrThrow} from '@/utils/useOrThrow';

const {classNames} = useOrThrow(useConfig, 'useConfig');
</script>
