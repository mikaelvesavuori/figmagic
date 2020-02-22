#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import trash from 'trash';
import dotenv from 'dotenv';
dotenv.config();

import { createConfiguration } from './bin/functions/createConfiguration.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';
import { errorGetData } from './bin/meta/errors.mjs';

const [, , ...CLI_ARGS] = process.argv;
const USER_CONFIG_PATH = `${process.cwd()}/.figmagicrc`;

(async () => {
  const CONFIG = await createConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
  const { token, url, outputFolderBaseFile, outputFolderTokens, outputFileName } = CONFIG;

  // Remove old folders
  await trash([`./${outputFolderTokens}`]);
  await trash([`./${outputFolderBaseFile}`]);

  // Add new folders
  createFolder(outputFolderTokens);
  createFolder(outputFolderBaseFile);

  // Attempt to get data
  const DATA = await getFromApi(token, url, outputFolderBaseFile, outputFileName);

  // If there's data and all is OK, start processing tokens
  if (DATA && DATA.status !== 403) {
    const TOKENS = createPage(DATA.document.children);
    writeTokens(TOKENS.children, CONFIG);
  } else {
    console.error(errorGetData);
  }
})();
