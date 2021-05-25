import trash from 'trash';

import { createFolder } from './createFolder';

import { ErrorRefresh } from '../errors/errors';

/**
 * @description Refresh a folder by trashing it first, then creating a new folder
 */
export async function refresh(path: string, trashExistingFolder = true): Promise<void> {
  try {
    if (!path) throw new Error(ErrorRefresh);

    if (trashExistingFolder) await trash([`./${path}`]);
    createFolder(path);
  } catch (error) {
    throw new Error(error);
  }
}
