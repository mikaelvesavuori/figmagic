import * as fs from 'fs';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> => {
  try {
    if (!path) throw new Error(ErrorSliceOutObjectFromFile);
    const _DATA = fs.readFileSync(path, 'utf8');
    const DATA = _DATA.slice(_DATA.indexOf('{'), _DATA.indexOf('}') + 1);
    return JSON.parse(DATA);
  } catch (error) {
    throw new Error(ErrorSliceOutObjectFromFile);
  }
};
