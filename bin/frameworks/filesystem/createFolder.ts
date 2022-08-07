import fs from 'fs';

import { ErrorCreateFolder } from '../errors/errors';

/**
 * @description Create folder, checking also if it already exists
 */
export function createFolder(dir: string): void {
  if (!dir) throw Error(ErrorCreateFolder);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}
