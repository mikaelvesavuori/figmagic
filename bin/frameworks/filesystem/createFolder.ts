import * as fs from 'fs';

import { ErrorCreateFolder } from '../../app/errors/errors';

/**
 * @description Create folder, checking also if it already exists
 *
 * @param dir The name of the directory that the user wants to create
 */
export async function createFolder(dir: string): Promise<boolean> {
  if (!dir) throw new Error(ErrorCreateFolder);

  return new Promise((resolve, reject) => {
    try {
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
