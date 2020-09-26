#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

import { makeConfiguration } from './bin/entities/Config/index';

import { FigmaData } from './bin/contracts/FigmaData';
import { Config } from './bin/contracts/Config';

import { FigmagicController } from './bin/controllers/FigmagicController';

import { write } from './bin/frameworks/filesystem/write';
import { getData } from './bin/frameworks/network/getData';
import { writeBaseJson } from './bin/frameworks/filesystem/writeBaseJson';
import { colors } from './bin/frameworks/system/colors';

import { MsgJobCompleteInit, MsgJobCompleteInitStopped } from './bin/frameworks/messages/messages';

const BASE_CONFIG = {
  templates: {
    templatePathReact: '/node_modules/figmagic/templates/react',
    templatePathStorybook: '/node_modules/figmagic/templates/story',
    templatePathStyled: '/node_modules/figmagic/templates/styled'
  }
};

const RC_FILE = '.figmagicrc';

/**
 * @description Initialize and setup Figmagic (environment; configuration; data) before handing over to the controller
 */
async function main(): Promise<void> {
  try {
    // Setup environment and user configuration
    dotenv.config();

    const [, , ...CLI_ARGS] = process.argv;
    if (CLI_ARGS[0].toLowerCase() === 'init') initConfig(BASE_CONFIG);
    else {
      const USER_CONFIG_PATH = path.join(`${process.cwd()}`, RC_FILE);
      const CONFIG: Config = await makeConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);

      // Get data
      const { recompileLocal, figmagicFolder, figmaData, token, url } = CONFIG;
      const DATA: FigmaData = await getData(recompileLocal, figmagicFolder, figmaData, token, url);

      // Write new JSON base data, unless user explicitly opts out
      if (!recompileLocal) await writeBaseJson(figmagicFolder, figmaData, DATA);

      // Run the controller
      await FigmagicController(CONFIG, DATA);
    }
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

/**
 * @description Handle basic configuration initialization
 */
function initConfig(file: any) {
  const FILE_EXISTS = fs.existsSync(RC_FILE);
  if (!FILE_EXISTS) {
    write(RC_FILE, JSON.stringify(file, null, ' '));
    console.log(MsgJobCompleteInit);
    return;
  }
  console.log(MsgJobCompleteInitStopped);
}

main();
