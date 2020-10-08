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
    const CONFIG = testConfig;
    CONFIG.recompileLocal = false;
    CONFIG.usePostscriptFontNames = false;
    CONFIG.token = '***';
    CONFIG.url = '***';

    const config = await makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
    config.token = '***';
    config.url = '***';
    expect(config).toMatchObject(CONFIG);
  });

  test('It should return a complete, custom configuration when passing in valid user config path, and some CLI arguments input', async () => {
    const CLI_ARGS: any[] = [
      '--debug',
      '--skipStorybook',
      '-t',
      process.env.IS_CI ? '***' : 'asdf1234'
    ];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    const CONFIG = testConfig;
    CONFIG.token = process.env.IS_CI ? '***' : 'asdf1234';
    CONFIG.url = process.env.IS_CI ? '***' : '';
    CONFIG.usePostscriptFontNames = false;
    CONFIG.skipFileGeneration.skipStorybook = true;
    CONFIG.debugMode = true;
    CONFIG.syncTokens = true;

    await expect(makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS)).resolves.toMatchObject(CONFIG);
  });
});
