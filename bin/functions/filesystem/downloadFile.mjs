import fetch from 'node-fetch';
import fs from 'fs';

import { errorDownloadFile } from '../../meta/errors.mjs';

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
export async function downloadFile(url, folder, file) {
  if (!url || !folder || !file) throw new Error(errorDownloadFile);

  const response = await fetch(url);
  if (response.status !== 200) return;

  if (!fs.existsSync(folder)) {
    fs.mkdirSync(folder);
  }

  return new Promise((resolve, reject) => {
    const PATH = `${folder}/${file}`;
    console.log('Writing file:', PATH);
    const _file = fs.createWriteStream(PATH);
    response.body.pipe(_file);
    _file.on('error', () => reject('Error when downloading file!'));
    _file.on('finish', () => resolve(PATH));
  });
}
