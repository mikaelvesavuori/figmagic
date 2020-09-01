import trash from 'trash';

import { createFolder } from './createFolder';

import { ErrorRefresh } from '../errors/errors';

/**
 * @description Refresh a folder by trashing it first, then creating a new folder
 *
 * @param path Path to folder
 */
export async function refresh(path: string): Promise<void> {
  if (!path) throw new Error(ErrorRefresh);

  await trash([`./${path}`]);
  await createFolder(path);
}
