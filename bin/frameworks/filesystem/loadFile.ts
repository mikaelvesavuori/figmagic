import * as fs from 'fs';

import { isJsonString } from '../filesystem/isJsonString';
import { ErrorLoadFile } from '../errors/errors';

/**
 * @description Load file from local path
 */
export function loadFile(path: string): string | Record<string, unknown> {
  try {
    if (!path) throw Error(ErrorLoadFile(path));
    if (!fs.existsSync(path)) throw Error(ErrorLoadFile(path));

    const DATA = fs.readFileSync(path, 'utf8');
    return isJsonString(DATA) ? JSON.parse(DATA) : DATA;
  } catch (error: any) {
    throw Error(error);
  }
}
