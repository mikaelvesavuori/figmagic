import * as fs from 'fs';

import { ErrorLoadFile } from '../errors/errors';

/**
 * @description Load file from local path
 *
 * @param path Path to local file
 * @param isRaw Bool to set if data should be parsed or not
 */
export function loadFile(path: string): any {
  try {
    if (!path) throw new Error(ErrorLoadFile(path));
    if (!fs.existsSync(path)) throw new Error(ErrorLoadFile(path));

    const data = fs.readFileSync(path, 'utf8');
    const DATA = isJsonString(data) ? JSON.parse(data) : data;
    return DATA;
  } catch (error) {
    console.error(error);
  }
}

// Reference: https://stackoverflow.com/questions/3710204/how-to-check-if-a-string-is-a-valid-json-string-in-javascript-without-using-try
const isJsonString = (str: string) => {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
};
