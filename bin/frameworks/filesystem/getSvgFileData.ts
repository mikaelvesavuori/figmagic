import fs from 'fs';

import { ErrorGetSvgFileData } from '../../frameworks/errors/errors';

export function getSvgFileData(filePath: string): string {
  if (!filePath) throw new Error(ErrorGetSvgFileData);
  if (!fs.existsSync(filePath)) return '';
  return fs.readFileSync(filePath, 'utf8');
}
