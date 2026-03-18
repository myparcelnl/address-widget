import {describe, expect, it} from 'vitest';
import {defineComponent, ref, type PropType} from 'vue';
import {mount} from '@vue/test-utils';
import BaseTextField from '@/components/Base/BaseTextField.vue';
import {type ConfigObject, useProvideConfig} from '@/composables/useConfig';

const HostComponent = defineComponent({
  components: {BaseTextField},
  props: {
    config: {
      type: Object as PropType<ConfigObject>,
      required: false,
      default: undefined,
    },
  },
  setup(props) {
    const {setConfig} = useProvideConfig();
    const model = ref('');

    if (props.config) {
      setConfig(props.config);
    }

    return {model};
  },
  template: '<BaseTextField v-model="model" class="existing-class" />',
});

describe('BaseTextField', () => {
  it('applies configured input classes without dropping incoming classes', () => {
    const wrapper = mount(HostComponent, {
      props: {
        config: {
          classNames: {
            input: ['input-text', 'theme-input'],
          },
        },
      },
    });

    const input = wrapper.get('input');

    expect(input.classes()).toContain('existing-class');
    expect(input.classes()).toContain('input-text');
    expect(input.classes()).toContain('theme-input');
  });
});
