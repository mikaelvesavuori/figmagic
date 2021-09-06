import fs from 'fs';
import path from 'path';

import { RefreshType } from '../../contracts/Refresh';

import { createFolder } from './createFolder';

import { ErrorRefresh } from '../errors/errors';

/**
 * @description Refresh a folder by first either deleting it or putting it in a local trash folder, then creating a new folder.
 */
//@ts-ignore
export function refresh(
  folderPath: string,
  refreshType: RefreshType,
  trashExistingFolder = true
): void {
  try {
    if (!folderPath) throw Error(ErrorRefresh);
    createFolder(folderPath);

    if (trashExistingFolder && fs.existsSync(folderPath)) {
      // Soft erase by moving into trash folder, giving the old copy a UTC (ISO 8601) timestamp
      if (refreshType === 'soft') {
        const date = new Date();
        const newFolder = `${folderPath}_${date.getUTCFullYear()}-${date.getUTCDate()}-${date.getUTCMonth()} ${date.getUTCHours()}:${date.getUTCMinutes()}:${date.getUTCSeconds()}`;
        createFolder(`.figmagic-trash/${newFolder}`);
        fs.renameSync(path.resolve(process.cwd(), folderPath), `.figmagic-trash/${newFolder}`);
      } // Hard erase of existing folder
      else if (refreshType === 'hard') {
        const NODE_VERSION = process.versions.node;
        if (NODE_VERSION > '14.14.0')
          fs.rmSync(path.resolve(process.cwd(), folderPath), { recursive: true });
      }
    }
    createFolder(folderPath);
  } catch (error: any) {
    throw Error(error);
  }
}
