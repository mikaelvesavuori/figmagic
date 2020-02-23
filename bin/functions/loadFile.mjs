import fs from 'fs';

import { errorLoadFile } from '../meta/errors.mjs';

/**
 * Load file from local path
 *
 * @exports
 * @async
 * @function
 * @param {string} path - Path to local file
 * @returns {object} - The parsed JSON object
 */
export async function loadFile(path) {
  if (!path) throw new Error(errorLoadFile);
  if (!fs.existsSync(path)) throw new Error(errorLoadFile);

  return await new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (error, data) => {
      if (error) reject(error);
      const DATA = JSON.parse(data);
      resolve(DATA);
    });
  });
}
