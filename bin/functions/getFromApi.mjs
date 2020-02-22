import fetch from 'node-fetch';

import { errorGetFromApi } from '../meta/errors.mjs';
import { writeFile } from './writeFile.mjs';

/**
 * Get data from API
 *
 * @exports
 * @async
 * @function
 * @param {string} figmaToken - User's Figma token
 * @param {string} figmaUrl - String representing user's Figma document
 * @param {string} outputFolderBaseFile - Folder to output Figma base document (JSON) to
 * @param {string} outputFileName - Name of base Figma document to process
 * @returns {object} - The fetched data inside of an object
 */
export async function getFromApi(figmaToken, figmaUrl, outputFolderBaseFile, outputFileName) {
  if (!figmaToken || !figmaUrl || !outputFolderBaseFile || !outputFileName)
    throw new Error(errorGetFromApi);

  let data = {};

  const URL = 'https://api.figma.com/v1/files/' + figmaUrl;

  await fetch(URL, {
    headers: {
      'X-Figma-Token': figmaToken
    }
  })
    .then(res => res.json())
    .then(json => {
      data = json;
      writeFile(JSON.stringify(json), outputFolderBaseFile, outputFileName);
    });

  return data;
}
