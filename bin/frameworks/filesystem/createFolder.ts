import * as fs from 'fs';

import { ErrorCreateFolder } from '../errors/errors';

/**
 * @description Create folder, checking also if it already exists
 *
 * @param dir The name of the directory that the user wants to create
 */
export function createFolder(dir: string): void {
  try {
    if (!dir) throw new Error(ErrorCreateFolder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (error) {
    throw new Error(ErrorCreateFolder);
  }
}
