import * as fs from 'fs';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> => {
  try {
    if (!path) throw new Error('asdf'); // TODO: Add real error
    const data = fs.readFileSync(path, 'utf8');
    const DATA = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
    return JSON.parse(DATA);
  } catch (error) {
    throw new Error(error); // TODO: Add real error
  }
};
