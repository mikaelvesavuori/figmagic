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

import { Config } from './bin/app/contracts/config/Config';
import { Page } from './bin/domain/Page/Page';
import { FigmaData } from './bin/domain/FigmaData/FigmaData';

import { defaultConfig } from './bin/meta/config';

async function main(config: Config): Promise<void> {
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
    outputFileName
  } = config;

  const data: FigmaData = recompileLocal
    ? await getDataLocal(outputFolderBaseFile, outputFileName)
    : await getDataRemote(token, url);

  if (!recompileLocal) await writeBaseJson(outputFolderBaseFile, outputFileName, data);

  await processTokens(config, data, outputFolderTokens);

  if (syncElements) await doSyncElements(config, data, outputFolderElements);
  if (syncGraphics) await doSyncGraphics(config, data, outputFolderGraphics);

  console.log(msgJobComplete);
}

async function getDataLocal(
  outputFolderBaseFile: string,
  outputFileName: string
): Promise<FigmaData> {
  console.log(msgSetDataFromLocal);

  try {
    return await loadFile(path.join(`${outputFolderBaseFile}`, `${outputFileName}`));
  } catch (error) {
    throw new Error(error);
  }
}

async function getDataRemote(token: string, url: string): Promise<FigmaData> {
  console.log(msgSetDataFromApi);

  let data = null;

  try {
    data = await getFromApi(token, url);
    if (!data || data.status === 403) throw new Error(errorGetData);
  } catch (error) {
    throw new Error(error);
  }

  return data;
}

async function writeBaseJson(
  outputFolderBaseFile: string,
  outputFileName: string,
  data: object
): Promise<object> {
  console.log(msgWriteBaseFile);
  try {
    await refresh(outputFolderBaseFile);
    await writeFile(JSON.stringify(data), outputFolderBaseFile, outputFileName, 'raw');

    return data;
  } catch (error) {
    throw new Error(error);
  }
}

async function processTokens(config: Config, data: FigmaData, outputFolder: string): Promise<void> {
  console.log(msgWriteTokens);
  try {
    const tokensPage: Page = createPage(data.document.children, 'Design Tokens');
    await refresh(outputFolder);
    await writeTokens(tokensPage.children, config);
  } catch (error) {
    throw new Error(error);
  }
}

async function doSyncElements(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(msgSyncElements);

  try {
    const { components } = data;
    const elementsPage = createPage(data.document.children, 'Elements');
    const elements = await processElements(elementsPage.children, config, components);
    await createFolder(outputFolder);
    await writeElements(elements, config);
  } catch (error) {
    throw new Error(error);
  }
}

async function doSyncGraphics(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(msgSyncGraphics);
  try {
    const graphicsPage = createPage(data.document.children, 'Graphics');
    await refresh(outputFolder);
    const fileList = await processGraphics(graphicsPage.children, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}

async function refresh(path: string): Promise<void> {
  await trash([`./${path}`]);
  await createFolder(path);
}

async function init(): Promise<void> {
  try {
    dotenv.config();
    const [, , ...CLI_ARGS] = process.argv;
    const userConfigPath = path.join(`${process.cwd()}`, `.figmagicrc`);
    const config = await createConfiguration(defaultConfig, userConfigPath, ...CLI_ARGS);

    await main(config);
  } catch (error) {
    console.error(`${colors.FgRed}${error}`);
  }
}

init();
