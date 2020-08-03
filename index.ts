#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import * as path from 'path';
import trash from 'trash';
import dotenv from 'dotenv';

import { createConfiguration } from './bin/functions/config/createConfiguration';

import { loadFile } from './bin/functions/filesystem/loadFile';
import { createFolder } from './bin/functions/filesystem/createFolder';
import { getFromApi } from './bin/functions/filesystem/getFromApi';
import { writeTokens } from './bin/functions/filesystem/writeTokens';
import { writeFile } from './bin/functions/filesystem/writeFile';
import { writeElements } from './bin/functions/filesystem/writeElements';
import { writeGraphics } from './bin/functions/filesystem/writeGraphics';

import { createPage } from './bin/functions/process/createPage';
import { processGraphics } from './bin/functions/process/processGraphics';
import { processElements } from './bin/functions/process/processElements';

import { colors } from './bin/meta/colors';
import { errorGetData } from './bin/meta/errors';
import {
  msgSetDataFromLocal,
  msgSetDataFromApi,
  msgWriteBaseFile,
  msgSyncGraphics,
  msgSyncElements,
  msgWriteTokens,
  msgJobComplete
} from './bin/meta/messages';

import { defaultConfig } from './bin/meta/config';

// TODO: Pick from config?
const FIGMAGIC_RC_FILENAME = `.figmagicrc`;

async function main(config, userConfigPath) {
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
  } = config;

  await getData(outputFolderBaseFile, outputFileName);

  await processTokens(config, data, tokensPage, outputFolderTokens);

  const COMPONENTS = DATA.components;
  //const STYLES = DATA.styles;

  if (syncElements) await syncElements(config);
  if (syncGraphics) await syncGraphics(config);
  console.log(msgJobComplete);
}

async function getData(outputFolderBaseFile, outputFileName) {
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

    try {
      if (!recompileLocal) await writeBaseJson(token, url, outputFolderBaseFile, outputFileName);
    } catch (error) {
      throw new Error(error);
    }
  }
  // Recompile: We want to use the existing Figma JSON file
  else {
    console.log(msgSetDataFromLocal);

    try {
      return await loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
    } catch (error) {
      throw new Error(error);
    }
  }
}

async function writeBaseJson(token, url, outputFolderBaseFile, outputFileName): object {
  console.log(msgWriteBaseFile);

  const data = await getFromApi(token, url);
  await trash([`./${outputFolderBaseFile}`]);
  await createFolder(outputFolderBaseFile);
  await writeFile(JSON.stringify(DATA), outputFolderBaseFile, outputFileName, 'raw');

  return data;
}

async function processTokens(config, data, tokensPage, outputFolderTokens) {
  console.log(msgWriteTokens);

  const TOKENS_PAGE = createPage(data.document.children, 'Design Tokens');
  await trash([`./${outputFolderTokens}`]);
  await createFolder(outputFolderTokens);
  await writeTokens(tokensPage.children, config);
}

async function syncElements(config, data, outputFolderElements, elementsPage, components) {
  console.log(msgSyncElements);

  const ELEMENTS_PAGE = createPage(data.document.children, 'Elements');
  const elements = await processElements(elementsPage.children, components, config);
  await createFolder(outputFolderElements);
  await writeElements(elements, config);
}

async function syncGraphics(config, data, outputFolderGraphics, graphicsPage) {
  console.log(msgSyncGraphics);

  const GRAPHICS_PAGE = createPage(data.document.children, 'Graphics');
  await trash([`./${outputFolderGraphics}`]);
  await createFolder(outputFolderGraphics);
  const FILE_LIST = await processGraphics(graphicsPage.children, config);
  await writeGraphics(FILE_LIST, config);
}

(async () => {
  try {
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const USER_CONFIG_PATH = path.join(`${process.cwd()}`, FIGMAGIC_RC_FILENAME);
    const CONFIG = await createConfiguration(defaultConfig, USER_CONFIG_PATH, ...CLI_ARGS);

    await main(CONFIG, USER_CONFIG_PATH);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
})();
