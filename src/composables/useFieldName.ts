import {toValue} from 'vue';
import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig} from './useConfig';

export const useFieldName = (name: string) => {
  const {configuration} = useOrThrow(useConfig, 'useConfig');

  const getFieldName = (): string => {
    if (toValue(configuration).appIdentifier) {
      return `${toValue(configuration).appIdentifier}_${name}`;
    }
    return `MyParcelAddressWidget_${name}`;
  };

  return {
    getFieldName,
  };
};
