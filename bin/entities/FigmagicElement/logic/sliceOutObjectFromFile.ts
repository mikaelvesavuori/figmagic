import fs from 'fs';

import { JsonFileData } from '../../../contracts/Files';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): JsonFileData => {
  if (!path) throw Error(ErrorSliceOutObjectFromFile);

  const data = fs.readFileSync(path, 'utf8');
  if (!data) throw Error(ErrorSliceOutObjectFromFile);

  const slicedData = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
  return JSON.parse(slicedData);
};
