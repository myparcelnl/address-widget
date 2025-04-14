import {toValue} from 'vue';
import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig} from './useConfig';

export const useFieldName = (name: string) => {
  const config = useOrThrow(useConfig, 'useConfig');

  const getFieldName = (): string => {
    if (toValue(config.appIdentifier)) {
      return `${toValue(config.appIdentifier)}_${name}`;
    }
    return `MyParcelAddressWidget_${name}`;
  };

  return {
    getFieldName,
  };
};
