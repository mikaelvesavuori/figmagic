import fetch from 'node-fetch';

import { errorGetFromApi } from '../meta/errors.mjs';

/**
 * Get data from API
 *
 * @exports
 * @async
 * @function
 * @param {string} figmaToken - User's Figma API token
 * @param {string} figmaUrl - String representing user's Figma document ID
 * @returns {object} - The fetched data inside of an object
 */
export async function getFromApi(figmaToken, figmaUrl, type = 'files') {
  if (!figmaToken || !figmaUrl) throw new Error(errorGetFromApi);

  return await fetch(`https://api.figma.com/v1/${type}/${figmaUrl}`, {
    headers: {
      'X-Figma-Token': figmaToken
    }
  })
    .then(res => res.json())
    .catch(error => {
      throw new Error(error);
    });
}
