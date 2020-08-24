import trash from 'trash';

import { createFolder } from './createFolder';

/**
 * @description TODO
 *
 * @param path
 */
export async function refresh(path: string): Promise<void> {
  await trash([`./${path}`]);
  await createFolder(path);
}
