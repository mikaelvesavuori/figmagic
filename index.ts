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
    const userConfigPath = path.join(`${process.cwd()}`, `.figmagicrc`);
    const configuration = new Configuration(userConfigPath, ...CLI_ARGS);
    const config: Config = await configuration.createConfig();

    // Get data
    const { recompileLocal, outputFolderBaseFile, outputFileName, token, url } = config;
    const data: FigmaData = await getData(
      recompileLocal,
      outputFolderBaseFile,
      outputFileName,
      token,
      url
    );

    // Write new JSON base data, unless user explicitly opts out
    if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, data);

    // Run the controller
    await FigmagicController(config, data).catch((error) => {
      console.error(error);
    });
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

main().catch((error) => {
  console.error(error);
});
