import {describe, expect, it, vi} from 'vitest';
import {defineComponent, ref} from 'vue';
import {mount} from '@vue/test-utils';
import BaseSelect from '@/components/Base/BaseSelect.vue';
import {useProvideConfig} from '@/composables/useConfig';

const HostComponent = defineComponent({
  components: {BaseSelect},
  props: {
    locale: {type: String, default: 'en'},
  },
  setup(props) {
    const {setConfig} = useProvideConfig();
    setConfig({locale: props.locale});
    const model = ref('');

    return {model};
  },
  template:
    '<BaseSelect v-model="model" :options="[{value: \'1\', label: \'One\'}]" />',
});

describe('BaseSelect', () => {
  it('translates the empty option', async () => {
    const wrapper = mount(HostComponent, {props: {locale: 'nl'}});

    await vi.dynamicImportSettled();

    expect(wrapper.findAll('option')[0].text()).toBe('Kies een optie');
  });
});
