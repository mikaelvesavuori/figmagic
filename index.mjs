#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import trash from 'trash';
import dotenv from 'dotenv';

import { createConfiguration } from './bin/functions/config/createConfiguration.mjs';

import { loadFile } from './bin/functions/filesystem/loadFile.mjs';
import { createFolder } from './bin/functions/filesystem/createFolder.mjs';
import { getFromApi } from './bin/functions/filesystem/getFromApi.mjs';
import { writeTokens } from './bin/functions/filesystem/writeTokens.mjs';
import { writeFile } from './bin/functions/filesystem/writeFile.mjs';
import { writeElements } from './bin/functions/filesystem/writeElements.mjs';
import { writeGraphics } from './bin/functions/filesystem/writeGraphics.mjs';

import { createPage } from './bin/functions/process/createPage.mjs';
import { processGraphics } from './bin/functions/process/processGraphics.mjs';
import { processElements } from './bin/functions/process/processElements.mjs';

import { colors } from './bin/meta/colors.mjs';
import { errorGetData } from './bin/meta/errors.mjs';
import {
  msgSetDataFromLocal,
  msgSetDataFromApi,
  msgWriteBaseFile,
  msgSyncGraphics,
  msgSyncElements,
  msgWriteTokens,
  msgJobComplete
} from './bin/meta/messages.mjs';

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
    syncGraphics,
    syncElements,
    outputFolderBaseFile,
    outputFolderTokens,
    outputFolderGraphics,
    outputFolderElements,
    //outputFolderComponents,
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
  })().catch((error) => {
    throw new Error(error);
  });

  // Write base Figma JSON if we are pulling from the web
  if (!recompileLocal) {
    console.log(msgWriteBaseFile);
    const DATA = await getFromApi(token, url);
    await trash([`./${outputFolderBaseFile}`]);
    await createFolder(outputFolderBaseFile);
    await writeFile(JSON.stringify(DATA), outputFolderBaseFile, outputFileName, 'raw');
  }

  // Process tokens
  console.log(msgWriteTokens);
  const TOKENS_PAGE = createPage(DATA.document.children, 'Design Tokens');
  await trash([`./${outputFolderTokens}`]);
  await createFolder(outputFolderTokens);
  await writeTokens(TOKENS_PAGE.children, CONFIG);

  const COMPONENTS = DATA.components;
  //const STYLES = DATA.styles;

  // Syncing elements
  if (syncElements) {
    console.log(msgSyncElements);
    const ELEMENTS_PAGE = createPage(DATA.document.children, 'Elements');
    const elements = await processElements(ELEMENTS_PAGE.children, COMPONENTS, CONFIG);
    await createFolder(outputFolderElements);
    await writeElements(elements, CONFIG);
  }

  // Syncing graphics
  if (syncGraphics) {
    console.log(msgSyncGraphics);
    const GRAPHICS_PAGE = createPage(DATA.document.children, 'Graphics');
    await trash([`./${outputFolderGraphics}`]);
    await createFolder(outputFolderGraphics);
    const FILE_LIST = await processGraphics(GRAPHICS_PAGE.children, CONFIG);
    await writeGraphics(FILE_LIST, CONFIG);
  }

  // All went well
  console.log(msgJobComplete);
}

(async () => {
  try {
    await figmagic();
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
})();
