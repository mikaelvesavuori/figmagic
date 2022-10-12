import { validateConfig } from '../../../../bin/entities/Config/logic/validateConfig';

import { testConfig } from '../../../../testdata/testConfig';

import {
  ErrorValidateBorderWidthUnit,
  ErrorValidateConfigFileName,
  ErrorValidateConfigFolderName,
  ErrorValidateConfigFontUnit,
  ErrorValidateConfigLetterSpacingUnit,
  ErrorValidateConfigLineHeightUnit,
  ErrorValidateConfigOpacitiesUnit,
  ErrorValidateConfigOutputDataTypeToken,
  ErrorValidateConfigOutputFormatColors,
  ErrorValidateConfigOutputFormatCss,
  ErrorValidateConfigOutputFormatElements,
  ErrorValidateConfigOutputFormatGraphics,
  ErrorValidateConfigOutputFormatStorybook,
  ErrorValidateConfigOutputFormatTokens,
  ErrorValidateConfigOutputScaleGraphics,
  ErrorValidateConfigSpacingUnit,
  ErrorValidateConfigTemplatePathGraphic,
  ErrorValidateConfigTemplatePathReact,
  ErrorValidateConfigTemplatePathStorybook,
  ErrorValidateConfigTemplatePathStyled,
  ErrorValidateRadiusUnit,
  ErrorValidateShadowUnit,
  ErrorValidateDurationUnit
} from '../../../../bin/frameworks/errors/errors';

describe('Success cases', () => {
  test('It should validate a fully valid config', () => {
    // @ts-ignore
    expect(validateConfig(testConfig)).toBe(true);
  });
});

describe('Failure cases', () => {
  test('It should throw an error when missing configuration', () => {
    // @ts-ignore
    expect(() => validateConfig()).toThrow();
  });

  test('It should invalidate a configuration when given invalid font unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.fontUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigFontUnit);
  });

  test('It should invalidate a configuration when given invalid border width unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.borderWidthUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateBorderWidthUnit);
  });

  test('It should invalidate a configuration when given invalid radius unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.radiusUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateRadiusUnit);
  });

  test('It should invalidate a configuration when given invalid shadow unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.shadowUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateShadowUnit);
  });

  test('It should invalidate a configuration when given invalid duration unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.durationUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateDurationUnit);
  });

  test('It should invalidate a configuration when given invalid letter spacing unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.letterSpacingUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigLetterSpacingUnit);
  });

  test('It should invalidate a configuration when given invalid line height unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.lineHeightUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigLineHeightUnit);
  });

  test('It should invalidate a configuration when given invalid opacity unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.opacitiesUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOpacitiesUnit);
  });

  test('It should invalidate a configuration when given no figma data name', () => {
    const TEST_CONFIG = { ...testConfig };
    // @ts-ignore
    TEST_CONFIG.figmaData = null;

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigFileName);
  });

  test('It should invalidate a configuration when given no Figmagic folder name', () => {
    const TEST_CONFIG = { ...testConfig };
    // @ts-ignore
    TEST_CONFIG.figmagicFolder = null;

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigFolderName);
  });

  test('It should invalidate a configuration when given invalid output format for colors', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatColors = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputFormatColors);
  });

  test('It should invalidate a configuration when given invalid output format for CSS', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatCss = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputFormatCss);
  });

  test('It should invalidate a configuration when given invalid output format for elements', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatElements = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputFormatElements);
  });

  test('It should invalidate a configuration when given invalid output format for graphics', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatGraphics = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputFormatGraphics);
  });

  test('It should invalidate a configuration when given invalid output format for Storybook', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatStorybook = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(
      ErrorValidateConfigOutputFormatStorybook
    );
  });

  test('It should invalidate a configuration when given invalid output format for tokens', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatTokens = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputFormatTokens);
  });

  test('It should invalidate a configuration when given invalid output scale for graphics', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputScaleGraphics = 0;

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputScaleGraphics);
  });

  test('It should invalidate a configuration when given invalid output data type for tokens', () => {
    const TEST_CONFIG = { ...testConfig };
    // @ts-ignore
    TEST_CONFIG.outputDataTypeToken = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigOutputDataTypeToken);
  });

  test('It should invalidate a configuration when given invalid spacing unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.spacingUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrowError(ErrorValidateConfigSpacingUnit);
  });

  test('It should invalidate a configuration when given no template path for React', () => {
    const testConfigReact = testConfig;
    // @ts-ignore
    testConfigReact.templates = {
      templatePathGraphic: 'something',
      templatePathReact: '',
      templatePathStorybook: 'something',
      templatePathStyled: 'something'
    };

    // @ts-ignore
    expect(() => validateConfig(testConfigReact)).toThrowError(
      ErrorValidateConfigTemplatePathReact
    );
  });

  test('It should invalidate a configuration when given no template path for Storybook', () => {
    const testConfigStorybook = testConfig;
    // @ts-ignore
    testConfigStorybook.templates = {
      templatePathGraphic: 'something',
      templatePathReact: 'something',
      templatePathStorybook: '',
      templatePathStyled: 'something'
    };

    // @ts-ignore
    expect(() => validateConfig(testConfigStorybook)).toThrowError(
      ErrorValidateConfigTemplatePathStorybook
    );
  });

  test('It should invalidate a configuration when given no template path for Styled Components', () => {
    const testConfigStyled = testConfig;
    // @ts-ignore
    testConfigStyled.templates = {
      templatePathGraphic: 'something',
      templatePathReact: 'something',
      templatePathStorybook: 'something',
      templatePathStyled: ''
    };

    // @ts-ignore
    expect(() => validateConfig(testConfigStyled)).toThrowError(
      ErrorValidateConfigTemplatePathStyled
    );
  });

  test('It should invalidate a configuration when given no template path for graphics', () => {
    const testConfigGraphics = testConfig;
    // @ts-ignore
    testConfigGraphics.templates = {
      templatePathGraphic: '',
      templatePathReact: 'something',
      templatePathStorybook: 'something',
      templatePathStyled: 'something'
    };

    // @ts-ignore
    expect(() => validateConfig(testConfigGraphics)).toThrowError(
      ErrorValidateConfigTemplatePathGraphic
    );
  });
});
