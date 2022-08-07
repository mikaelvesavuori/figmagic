import fs from 'fs';
import path from 'path';

import { createFolder } from './createFolder';

import { ErrorRefresh } from '../errors/errors';

/**
 * @description Refreshing a folder can happen in two ways:
 * 1. If it exists: Delete and then re-create it.
 * 2. If it does not exist: Create it.
 *
 * This supports both the newer post-Node 14.14.0 method, `fs.rmSync()`, and the older method, `fs.rmdirSync()`.
 */
//@ts-ignore
export function refresh(folderPath: string, trashExistingFolder = true): string {
  if (!folderPath) throw Error(ErrorRefresh);
  const resolvedPath = path.resolve(process.cwd(), folderPath);

  if (trashExistingFolder && fs.existsSync(resolvedPath)) {
    if (process.versions.node >= '14.14.0') fs.rmSync(resolvedPath, { recursive: true });
    else fs.rmdirSync(resolvedPath, { recursive: true });
  }

  createFolder(resolvedPath);
  return resolvedPath;
}
