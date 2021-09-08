import fs from 'fs';

import { ErrorSliceOutObjectFromFile } from '../../../frameworks/errors/errors';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> | void => {
  if (!path) throw Error(ErrorSliceOutObjectFromFile);

  try {
    const DATA = fs.readFileSync(path, 'utf8');
    if (!DATA) throw Error(ErrorSliceOutObjectFromFile);

    const SLICED_DATA = DATA.slice(DATA.indexOf('{'), DATA.indexOf('}') + 1);
    return JSON.parse(SLICED_DATA);
  } catch (error: any) {
    return;
  }
};
