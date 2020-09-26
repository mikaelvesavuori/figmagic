import { validateConfig } from '../../../../bin/entities/Config/logic/validateConfig';

import { testConfig } from '../../../../testdata/testConfig';

describe('Failure cases', () => {
  test('It should throw an error when missing configuration', () => {
    // @ts-ignore
    expect(() => validateConfig()).toThrow();
  });

  test('It should invalidate a configuration when given invalid font unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.fontUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrow();
  });

  test('It should invalidate a configuration when given invalid letter spacing unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.letterSpacingUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrow();
  });

  test('It should invalidate a configuration when given invalid opacity unit', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.opacitiesUnit = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrow();
  });

  test('It should invalidate a configuration when given no figma data name', () => {
    const TEST_CONFIG = { ...testConfig };
    // @ts-ignore
    TEST_CONFIG.figmaData = null;

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrow();
  });

  test('It should invalidate a configuration when given invalid output format for css', () => {
    const TEST_CONFIG = { ...testConfig };
    TEST_CONFIG.outputFormatCss = 'xxxxx';

    // @ts-ignore
    expect(() => validateConfig(TEST_CONFIG)).toThrow();
  });
});

describe('Success cases', () => {
  test('It should validate a fully valid config', () => {
    // @ts-ignore
    expect(validateConfig(testConfig)).toBe(true);
  });
});
