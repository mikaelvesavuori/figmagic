import * as path from 'path';

import { makeConfiguration } from '../../../bin/entities/Config/index';

import { testConfig } from '../../../testdata/testConfig';

describe('Failure cases', () => {
  test('It should throw an error if called without a user config path', async () => {
    const CLI_ARGS: any[] = [];
    const USER_CONFIG_PATH = '';

    await expect(makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS)).rejects.toThrowError();
  });
});

describe('Success cases', () => {
  test('It should return a complete, default configuration when passing in valid user config path, but no CLI arguments input', async () => {
    const CLI_ARGS: any[] = [];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    testConfig.recompileLocal = false;
    testConfig.usePostscriptFontNames = false;

    await expect(makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS)).resolves.toMatchObject(
      testConfig
    );
  });

  test('It should return a complete, custom configuration when passing in valid user config path, and some CLI arguments input', async () => {
    const CLI_ARGS: any[] = ['--debug', '--skipStorybook', '-t', 'some-RANDOM-t0k3n'];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    testConfig.token = 'some-RANDOM-t0k3n';
    testConfig.usePostscriptFontNames = false;
    testConfig.skipFileGeneration.skipStorybook = true;
    testConfig.debugMode = true;

    await expect(makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS)).resolves.toMatchObject(
      testConfig
    );
  });
});
