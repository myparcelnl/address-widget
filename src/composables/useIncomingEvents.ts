import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig, type ConfigObject} from './useConfig';

export const CONFIGURATION_UPDATE_EVENT = 'configuration-update';

export const useIncomingEvents = () => {
  const {setConfig} = useOrThrow(useConfig, 'useConfig');

  const handleConfigurationUpdate = (event: CustomEvent<ConfigObject>) => {
    setConfig(event.detail);
  };

  document.addEventListener(CONFIGURATION_UPDATE_EVENT, (event) => {
    // Verify the event is of the correct type
    if (!(event instanceof CustomEvent)) {
      console.error('Invalid event type for configuration update');
      return;
    }
    handleConfigurationUpdate(event);
  });

  return {
    handleConfigurationUpdate,
  };
};
