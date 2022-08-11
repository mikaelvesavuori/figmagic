#!/usr/bin/env node

import * as path from 'path';

import { makeConfiguration } from './bin/entities/Config/index';

import { FigmaResponse } from './bin/contracts/FigmaData';
import { Config, TemplatesConfig } from './bin/contracts/Config';

import { FigmagicController } from './bin/controllers/FigmagicController';

import { loadEnv } from './bin/frameworks/system/loadEnv';
import { write } from './bin/frameworks/filesystem/write';
import { getData } from './bin/frameworks/network/getData';
import { writeBaseJson } from './bin/frameworks/filesystem/writeBaseJson';
import { colors } from './bin/frameworks/system/colors';
import { checkIfExists } from './bin/frameworks/filesystem/checkIfExists';
import { configToInit } from './bin/frameworks/system/configToInit';

import { MsgJobCompleteInit, MsgJobCompleteInitStopped } from './bin/frameworks/messages/messages';

const RC_FILES = ['figmagic.json', '.figmagicrc'];

/**
 * @description Initialize and setup Figmagic (environment; configuration; data) before handing over to the controller
 */
async function main(): Promise<void> {
  try {
    // Setup environment and user configuration
    loadEnv();

    // Use first valid match for configuration file
    const configFilePath: string = RC_FILES.filter((configFile: string) => {
      if (checkIfExists(configFile)) return configFile;
    })[0];

    // User wants to init a configuration...
    const [, , ...CLI_ARGS] = process.argv;
    if (CLI_ARGS[0]?.toLowerCase() === 'init') initConfig(configToInit, RC_FILES[0]);
    // User wants to run Figmagic
    else {
      const userConfigPath = configFilePath ? path.join(`${process.cwd()}`, configFilePath) : '';
      const config: Config = await makeConfiguration(userConfigPath, ...CLI_ARGS);

      // Get data
      const { recompileLocal, figmagicFolder, figmaData, token, url, versionName } = config;
      const data: FigmaResponse = await getData(
        recompileLocal,
        figmagicFolder,
        figmaData,
        token,
        url,
        versionName
      );

      // Write new JSON base data, unless user explicitly opts out
      if (!recompileLocal) await writeBaseJson(figmagicFolder, figmaData, data);

      // Run the controller
      await FigmagicController(config, data);
    }
  } catch (error: any) {
    console.error(`${colors.FgRed}${error.message}`);
  }
}

/**
 * @description Handle basic configuration initialization
 */
function initConfig(file: TemplatesConfig, configFilePath: string) {
  const FILE_EXISTS = checkIfExists(configFilePath);
  if (!FILE_EXISTS) {
    write(configFilePath, JSON.stringify(file, null, ' '));
    console.log(MsgJobCompleteInit);
    return;
  }
  console.log(MsgJobCompleteInitStopped);
}

main();
