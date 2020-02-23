import fetch from 'node-fetch';

//import { writeFile } from './writeFile.mjs';

import { errorGetFromApi } from '../meta/errors.mjs';

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

  const URL = 'https://api.figma.com/v1/files/' + figmaUrl;

  return await fetch(URL, {
    headers: {
      'X-Figma-Token': figmaToken
    }
  }).then(res => res.json());
}
