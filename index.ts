#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as path from 'path';
import dotenv from 'dotenv';

import { FigmagicController } from './bin/app/controllers/FigmagicController';

import { createConfiguration } from './bin/entities/Config/createConfiguration';

import { colors } from './bin/frameworks/system/colors';
import { defaultConfig } from './bin/entities/Config/config';

/**
 * @description TODO
 */
async function main(): Promise<void> {
  try {
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const userConfigPath = path.join(`${process.cwd()}`, `.figmagicrc`);
    const config = await createConfiguration(defaultConfig, userConfigPath, ...CLI_ARGS);

    await FigmagicController(config);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

main();
