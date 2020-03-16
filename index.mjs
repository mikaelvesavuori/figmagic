#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import trash from 'trash';
import dotenv from 'dotenv';

import { loadFile } from './bin/functions/loadFile.mjs';
import { createConfiguration } from './bin/functions/createConfiguration.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';
import { writeFile } from './bin/functions/writeFile.mjs';

import { errorGetData } from './bin/meta/errors.mjs';
import { msgSetDataFromLocal, msgSetDataFromApi } from './bin/meta/messages.mjs';

async function figmagic() {
  // Setup
  dotenv.config();
  const [, , ...CLI_ARGS] = process.argv;
  const USER_CONFIG_PATH = `${process.cwd()}/.figmagicrc`;
  const CONFIG = await createConfiguration(USER_CONFIG_PATH, ...CLI_ARGS);
  const {
    token,
    url,
    recompileLocal,
    outputFolderBaseFile,
    outputFolderTokens,
    outputFileName
  } = CONFIG;

  const DATA = await (async () => {
    // Normal: We want to get data from the Figma API
    if (!recompileLocal) {
      console.log(msgSetDataFromApi);

      // Attempt to get data
      try {
        const _DATA = await getFromApi(token, url);

        // If there's no data or something went funky, eject
        if (!_DATA || _DATA.status === 403) throw new Error(errorGetData);

        return _DATA;
      } catch (error) {
        throw new Error(error);
      }
    }
    // Recompile: We want to use the existing Figma JSON file
    else {
      console.log(msgSetDataFromLocal);

      try {
        return await loadFile(`./${outputFolderBaseFile}/${outputFileName}`);
      } catch (error) {
        throw new Error(error);
      }
    }
  })().catch(error => {
    throw new Error(error);
  });

  // If this is a fresh pull from the API, trash the old folders
  if (!recompileLocal) {
    await trash([`./${outputFolderTokens}`]);
    await trash([`./${outputFolderBaseFile}`]);
  }

  // Create new folders if they don't exist
  await createFolder(outputFolderTokens);
  await createFolder(outputFolderBaseFile);

  // Write base Figma JSON
  writeFile(JSON.stringify(DATA), outputFolderBaseFile, outputFileName);

  // Process tokens
  const TOKENS = createPage(DATA.document.children);
  writeTokens(TOKENS.children, CONFIG);

  // All went well
  console.log('Figmagic completed operations successfully!');
}

(async () => {
  try {
    await figmagic();
  } catch (error) {
    console.error(error);
  }
})();
