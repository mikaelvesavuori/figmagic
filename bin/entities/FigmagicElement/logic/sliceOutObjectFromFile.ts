import * as fs from 'fs';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> => {
  try {
    if (!path) throw new Error(ErrorSliceOutObjectFromFile);

    const DATA = fs.readFileSync(path, 'utf8');
    if (!DATA) throw new Error(ErrorSliceOutObjectFromFile);

    const SLICED_DATA = DATA.slice(DATA.indexOf('{'), DATA.indexOf('}') + 1);
    return JSON.parse(SLICED_DATA);
  } catch (error) {
    throw new Error(ErrorSliceOutObjectFromFile);
  }
};
