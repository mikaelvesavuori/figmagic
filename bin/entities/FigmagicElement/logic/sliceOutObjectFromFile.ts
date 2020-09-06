import * as fs from 'fs';

export const sliceOutObjectFromFile = (path: string): Record<string, unknown> => {
  const data = fs.readFileSync(path, 'utf8');
  const DATA = data.slice(data.indexOf('{'), data.indexOf('}') + 1);
  return JSON.parse(DATA);
};
