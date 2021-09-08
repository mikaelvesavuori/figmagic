import fs from 'fs';

import { ErrorGetSvgFileData } from '../../frameworks/errors/errors';

export function getSvgFileData(filePath: string): string {
  if (!filePath) throw Error(ErrorGetSvgFileData);
  if (!fs.existsSync(`${process.cwd()}/${filePath}`)) return '';
  return fs.readFileSync(`${process.cwd()}/${filePath}`, 'utf8');
}
