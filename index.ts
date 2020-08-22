#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as path from 'path';
import dotenv from 'dotenv';

import { FigmagicController } from './bin/app/controllers/FigmagicController';

import { createConfiguration } from './bin/entities/Config/createConfiguration';

import { getData } from './bin/frameworks/network/getData';
import { writeBaseJson } from './bin/frameworks/main/writeBaseJson';

import { colors } from './bin/frameworks/system/colors';
import { defaultConfig } from './bin/entities/Config/config';

/**
 * @description TODO
 */
async function main(): Promise<void> {
  try {
    // Setup environment
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const userConfigPath = path.join(`${process.cwd()}`, `.figmagicrc`);

    // Get user configuration
    const config = await createConfiguration(defaultConfig, userConfigPath, ...CLI_ARGS);

    // Get data
    const { recompileLocal, outputFolderBaseFile, outputFileName, token, url } = config;
    const data = await getData(recompileLocal, outputFolderBaseFile, outputFileName, token, url);

    // Write new JSON base data, unless user explicitly opts out
    if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, data);

    // Run the controller
    await FigmagicController(config, data);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

main();
