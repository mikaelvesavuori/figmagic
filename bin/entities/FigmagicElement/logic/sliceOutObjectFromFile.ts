import * as fs from 'fs';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> => {
  try {
    if (!path) throw new Error(ErrorSliceOutObjectFromFile);
    const data = fs.readFileSync(path, 'utf8');
    const DATA = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
    return JSON.parse(DATA);
  } catch (error) {
    throw new Error(ErrorSliceOutObjectFromFile);
  }
};
