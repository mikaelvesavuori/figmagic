import { WriteOperation } from '../../../contracts/Write';

import { writeFile } from '../../../frameworks/filesystem/writeFile';

import { ErrorWriteTokens } from '../../../frameworks/errors/errors';

/**
 * @description Write processed tokens to file
 */
export function writeTokens(processedTokens: WriteOperation[]): void {
  try {
    if (!processedTokens) throw new Error(ErrorWriteTokens);
    processedTokens.forEach((token) => writeFile(token));
  } catch (error) {
    throw new Error(error);
  }
}
