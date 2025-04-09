import {useOrThrow} from '@/utils/useOrThrow';
import {useConfig, type ConfigObject} from './useConfig';
import {toValue} from 'vue';

export const CONFIGURATION_UPDATE_EVENT = 'configuration-update';
export type ConfigEventPayload = {
  config: ConfigObject;
  appIdentifier?: string;
};

export const useIncomingEvents = () => {
  const {setConfig, appIdentifier: configuredAppIdentifier} = useOrThrow(
    useConfig,
    'useConfig',
  );

  const handleConfigurationUpdate = (
    event: CustomEvent<ConfigEventPayload>,
  ) => {
    // Check if the provided identifier is the same as the configured one.
    // If both are undefined, that's also fine, we assume it's not relevant.
    if (toValue(configuredAppIdentifier) !== event.detail.appIdentifier) {
      console.info(
        `Ignoring configuration update for appIdentifier ${event.detail.appIdentifier}, current appIdentifier is ${toValue(configuredAppIdentifier)}`,
      );
      return;
    } else {
      // Warns if this app doesn't have any identifier, and the event is trying to update a specific one.
      if (!toValue(configuredAppIdentifier) && event.detail.appIdentifier) {
        console.warn(
          'An appIdentifier was provided as part of the event, but not in the config. This may lead to unexpected behavior.',
        );
      }
      setConfig(event.detail.config);
    }
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
