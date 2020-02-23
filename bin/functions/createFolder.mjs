import fs from 'fs';

import { errorCreateFolder } from '../meta/errors.mjs';

/**
 * Create folder, checking also if it already exists
 *
 * @exports
 * @function
 * @param {string} dir - The name of the directory that the user wants to create
 * @returns {Promise} - Returns promise from wrapped fs.mkdir
 * @throws {error} - When no directory specified
 */
export async function createFolder(dir) {
  if (!dir) throw new Error(errorCreateFolder);

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdir(dir, { recursive: true }, error => {
          if (error) throw error;
          resolve();
        });
      }

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}
