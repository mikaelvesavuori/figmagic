import fs from 'fs';

import { ErrorLoadFile } from '../errors/errors';
import { isJsonString } from '../filesystem/isJsonString';

/**
 * @description Load file from local path
 */
export function loadFile(path: string): string | Record<string, unknown> {
  if (!path) throw Error(ErrorLoadFile(path));
  if (!fs.existsSync(path)) throw Error(ErrorLoadFile(path));

  const data = fs.readFileSync(path, 'utf8');
  return isJsonString(data) ? JSON.parse(data) : data;
}
