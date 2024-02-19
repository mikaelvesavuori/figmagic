import fs from 'fs';

import { JsonFileData } from '../../../contracts/Files';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): JsonFileData => {
  if (!path) throw Error(ErrorSliceOutObjectFromFile);

  const data = fs.readFileSync(path, 'utf8');
  if (!data) throw Error(ErrorSliceOutObjectFromFile);

  const slicedData = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
  if (isJson(slicedData)) return JSON.parse(slicedData); // This is added because CSS generation breaks if using elements and CSS tokens
  return slicedData as any;
};

const isJson = (input: any) => {
  if (typeof input !== 'string') return false;
  try {
    JSON.parse(input);
    return true;
  } catch (error) {
    return false;
  }
};
