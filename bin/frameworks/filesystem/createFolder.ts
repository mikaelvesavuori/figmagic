import fs from 'fs';

import { ErrorCreateFolder } from '../errors/errors';

/**
 * @description Create folder, checking also if it already exists
 */
export function createFolder(dir: string): void {
  try {
    if (!dir) throw Error(ErrorCreateFolder);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  } catch (error: any) {
    throw Error(error);
  }
}
