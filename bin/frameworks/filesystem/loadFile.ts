import * as fs from 'fs';

import { ErrorLoadFile } from '../errors/errors';

/**
 * @description Load file from local path
 *
 * @param path Path to local file
 * @param isRaw Bool to set if data should be parsed or not
 */
export async function loadFile(path: string, isRaw = false): Promise<any> {
  if (!path) throw new Error(ErrorLoadFile(path));
  if (!fs.existsSync(path)) throw new Error(ErrorLoadFile(path));

  try {
    return await new Promise((resolve, reject) =>
      fs.readFile(path, 'utf8', (error, data) => {
        if (error) reject(error);
        if (isRaw) resolve(data); // Won't do anything...

        const DATA = isJsonString(data) ? JSON.parse(data) : data; //typeof data === 'string' ? data : JSON.parse(data);
        resolve(DATA);
      })
    );
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
