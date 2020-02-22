import { errorCreateFolder } from '../meta/errors.mjs';

import fs from 'fs';

/**
 * Create folder, checking also if it already exists
 *
 * @exports
 * @function
 * @param {string} dir - The name of the directory that the user wants to create
 * @returns {void} - New folder created with fs.mkdirSync()
 * @throws {error} - When no directory specified
 */
export function createFolder(dir) {
  if (dir) {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir);
    }
  } else {
    throw new Error(errorCreateFolder);
  }
}
