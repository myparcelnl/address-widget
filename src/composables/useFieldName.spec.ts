import {it, describe, expect} from 'vitest';
import {useFieldName} from './useFieldName';
import {useProvideConfig} from './useConfig';
import {withSetup} from '../../tests/withSetup';

describe('useFieldName', () => {
  it('uses the default name', () => {
    const [[, fieldName]] = withSetup(
      {composable: useProvideConfig},
      {composable: useFieldName, args: ['myFieldName']},
    );
    expect(fieldName.getFieldName()).toBe('MyParcelAddressWidget_myFieldName');
  });

  it('uses the appIdentifier', () => {
    const [[config, fieldName]] = withSetup(
      {composable: useProvideConfig},
      {composable: useFieldName, args: ['myFieldName']},
    );
    config.setConfig({appIdentifier: 'MyAppIdentifier'});
    expect(fieldName.getFieldName()).toBe('MyAppIdentifier_myFieldName');
  });
});
