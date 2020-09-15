#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as path from 'path';
import * as dotenv from 'dotenv';

import { Configuration } from './bin/entities/Config/index';

import { FigmaData } from './bin/contracts/FigmaData';
import { Config } from './bin/contracts/Config';

import { FigmagicController } from './bin/controllers/FigmagicController';

import { getData } from './bin/frameworks/network/getData';
import { writeBaseJson } from './bin/frameworks/filesystem/writeBaseJson';
import { colors } from './bin/frameworks/system/colors';

/**
 * @description Initialize and setup Figmagic (environment; configuration; data) before handing over to the controller
 */
async function main(): Promise<void> {
  try {
    // Setup environment and user configuration
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, `.figmagicrc`);
    const CONFIGURATION = new Configuration(USER_CONFIG_PATH, ...CLI_ARGS);
    const CONFIG: Config = await CONFIGURATION.createConfig();

    // Get data
    const { recompileLocal, outputFolderBaseFile, outputFileName, token, url } = CONFIG;
    const DATA: FigmaData = await getData(
      recompileLocal,
      outputFolderBaseFile,
      outputFileName,
      token,
      url
    );

    // Write new JSON base data, unless user explicitly opts out
    if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, DATA);

    // Run the controller
    await FigmagicController(CONFIG, DATA);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

main();
