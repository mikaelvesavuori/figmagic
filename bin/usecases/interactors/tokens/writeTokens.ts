import { WriteOperation } from '../../../contracts/Write';

import { writeFile } from '../../../frameworks/filesystem/writeFile';

import { ErrorWriteTokens } from '../../../frameworks/errors/errors';

/**
 * @description Write tokens to file
 *
 * @param tokens The final array of design tokens
 * @param config User configuration object
 */
export function writeTokens(processedTokens: WriteOperation[]): void {
  try {
    if (!processedTokens) throw new Error(ErrorWriteTokens);
    processedTokens.forEach((token) => writeFile(token));
  } catch (error) {
    throw new Error(ErrorWriteTokens);
  }
}
