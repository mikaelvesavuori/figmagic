#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as path from 'path';
import dotenv from 'dotenv';

import { FigmaData } from './bin/app/contracts/FigmaData';
import { Config } from './bin/entities/Config/Config';
import { defaultConfig } from './bin/entities/Config/defaultConfig';
import { createConfiguration } from './bin/entities/Config/createConfiguration';

import { FigmagicController } from './bin/app/controllers/FigmagicController';

import { getData } from './bin/frameworks/network/getData';
import { writeBaseJson } from './bin/frameworks/filesystem/writeBaseJson';
import { colors } from './bin/frameworks/system/colors';

/**
 * @description Initialize and setup Figmagic (environment; configuration; data) before handing over to the controller
 */
async function main(baseConfiguration: Config): Promise<void> {
  try {
    // Setup environment
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const userConfigPath = path.join(`${process.cwd()}`, `.figmagicrc`);

    // Get user configuration
    const config: Config = await createConfiguration(
      baseConfiguration,
      userConfigPath,
      ...CLI_ARGS
    );

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
    await FigmagicController(config, data);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

// Initialize with default configuration
main(defaultConfig);
