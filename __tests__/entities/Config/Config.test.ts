import * as path from 'path';

import { makeConfiguration } from '../../../bin/entities/Config/index';

import { testConfig } from '../../../testdata/testConfig';

describe('Success cases', () => {
  test('It should use default/base configuration if called without a user config path', async () => {
    const CLI_ARGS: string[] = [];
    const USER_CONFIG_PATH = '';
    const CONFIG = testConfig;
    CONFIG.token = '***';
    CONFIG.url = '***';

    const config = await makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
    config.token = '***';
    config.url = '***';
    expect(config).toMatchObject(CONFIG);
  });

  test('It should return a complete, default configuration when passing in valid user config path, but no CLI arguments input', async () => {
    const CLI_ARGS: string[] = [];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    const CONFIG = testConfig;
    CONFIG.recompileLocal = false;
    CONFIG.usePostscriptFontNames = false;
    CONFIG.useLiteralFontFamilies = false;
    CONFIG.token = '***';
    CONFIG.url = '***';

    const config = await makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
    config.token = '***';
    config.url = '***';
    expect(config).toMatchObject(CONFIG);
  });

  test('It should return a complete, custom configuration when passing in valid user config path, and some CLI arguments input', async () => {
    const CLI_ARGS: string[] = [
      '--debug',
      '--skipStorybook',
      '-t',
      process.env.IS_CI ? '***' : 'asdf1234'
    ];
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `testdata`, `figmagicrc`);
    const CONFIG = testConfig;
    CONFIG.token = process.env.IS_CI ? '***' : 'asdf1234';
    CONFIG.url = process.env.IS_CI ? '***' : '4fi3f3';
    CONFIG.usePostscriptFontNames = false;
    CONFIG.useLiteralFontFamilies = false;
    CONFIG.skipFileGeneration.skipStorybook = true;
    CONFIG.debugMode = true;
    CONFIG.syncTokens = true;

    const config = await makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
    config.url = process.env.IS_CI ? '***' : '4fi3f3';
    expect(config).toMatchObject(CONFIG);
  });
});
