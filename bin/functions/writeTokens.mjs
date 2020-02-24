import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';

import { errorWriteTokens, errorWriteTokensNoSettings } from '../meta/errors.mjs';

/**
 * Write tokens to file
 *
 * @exports
 * @function
 * @param {array} tokens - The final array of design tokens
 * @param {object} settings - User configuration object
 * @returns {true} - Return true when finished
 * @throws {error} - When no than one token is provided
 */
export function writeTokens(tokens, settings) {
  if (!(tokens.length > 0)) throw new Error(errorWriteTokens);
  if (!settings) throw new Error(errorWriteTokensNoSettings);

  tokens.forEach(token => {
    let tokenName = camelize(token.name);
    tokenName = formatName(tokenName);

    const PROCESSED_TOKEN = processTokens(token, tokenName, settings);

    writeFile(
      PROCESSED_TOKEN,
      settings.outputFolderTokens,
      tokenName,
      true,
      settings.outputTokenFormat
    );
  });

  return true;
}
