//import trash from 'trash';

import { createFolder } from './createFolder';

import { ErrorRefresh } from '../errors/errors';

/**
 * @description Refresh a folder by trashing it first, then creating a new folder
 */
//@ts-ignore
export async function refresh(path: string, trashExistingFolder = true): Promise<void> {
  try {
    if (!path) throw new Error(ErrorRefresh);

    //if (trashExistingFolder) await trash([`./${path}`]); // TODO
    createFolder(path);
  } catch (error: any) {
    throw new Error(error);
  }
}
