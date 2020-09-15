import * as fs from 'fs';

import { ErrorLoadFile } from '../errors/errors';

/**
 * @description Load file from local path
 *
 * @param path Path to local file
 * @param isRaw Bool to set if data should be parsed or not
 */
export function loadFile(path: string): string | Record<string, unknown> {
  try {
    if (!path) throw new Error(ErrorLoadFile(path));
    if (!fs.existsSync(path)) throw new Error(ErrorLoadFile(path));

    const DATA = fs.readFileSync(path, 'utf8');
    return isJsonString(DATA) ? JSON.parse(DATA) : DATA;
  } catch (error) {
    throw new Error(ErrorLoadFile(path));
  }
}

// Reference: https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
const isJsonString = (str: string): Record<string, unknown> | boolean => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
