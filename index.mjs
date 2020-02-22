#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import { errorGetData } from './bin/meta/errors.mjs';
import { parseArgs } from './bin/functions/parseArgs.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';

import rimraf from 'rimraf';
import dotenv from 'dotenv';
dotenv.config();

const [, , ...ARGS] = process.argv;
const SETTINGS = parseArgs([...ARGS]);
const { token, url, outputFolderBaseFile, outputFolderTokens, outputFileName } = SETTINGS;

(async () => {
	rimraf(`./${outputFolderTokens}`, () => {});
	rimraf(`./${outputFolderBaseFile}`, () => {});

	createFolder(outputFolderTokens);
	createFolder(outputFolderBaseFile);

	const DATA = await getFromApi(token, url, outputFolderBaseFile, outputFileName);

	if (DATA && DATA.status !== 403) {
		const TOKENS = createPage(DATA.document.children);
		writeTokens(TOKENS.children, SETTINGS);
	} else {
		console.error(errorGetData);
	}
})();
