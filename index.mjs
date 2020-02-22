#!/bin/sh
':'; //# ; exec /usr/bin/env node --experimental-modules --no-warnings "$0" "$@"

import fs from 'fs';
import trash from 'trash';
import dotenv from 'dotenv';
dotenv.config();

import { errorGetData } from './bin/meta/errors.mjs';
import { parseArgs } from './bin/functions/parseArgs.mjs';
import { createFolder } from './bin/functions/createFolder.mjs';
import { getFromApi } from './bin/functions/getFromApi.mjs';
import { createPage } from './bin/functions/createPage.mjs';
import { writeTokens } from './bin/functions/writeTokens.mjs';

const [, , ...ARGS] = process.argv;
const SETTINGS = parseArgs([...ARGS]);
const { token, url, outputFolderBaseFile, outputFolderTokens, outputFileName } = SETTINGS;

const USER_CONFIG_PATH = `${process.cwd()}/.figmagicrc`;

(async () => {
	/*
	// Remove old folders
	await trash([`./${outputFolderTokens}`]);
	await trash([`./${outputFolderBaseFile}`]);

	// Add new folders
	createFolder(outputFolderTokens);
	createFolder(outputFolderBaseFile);
	*/

	console.log(process.cwd());

	// Check for, and read, any existing user configuration
	if (fs.existsSync(USER_CONFIG_PATH)) {
		fs.readFile(USER_CONFIG_PATH, 'utf8', (err, data) => {
			if (err) throw new Error(err);
			console.log(JSON.parse(data));
		});
	}

	/*
	// Attempt to get data
	const DATA = await getFromApi(token, url, outputFolderBaseFile, outputFileName);

	// If there's data and all is OK, start processing tokens
	if (DATA && DATA.status !== 403) {
		const TOKENS = createPage(DATA.document.children);
		writeTokens(TOKENS.children, SETTINGS);
	} else {
		console.error(errorGetData);
	}
	*/
})();
