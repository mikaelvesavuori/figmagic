import { camelize } from './camelize.mjs';
import { formatName } from './formatName.mjs';
import { processTokens } from './processTokens.mjs';
import { writeFile } from './writeFile.mjs';
import { errorWriteTokens } from '../meta/errors.mjs';

/**
 * Write tokens to file
 *
 * @exports
 * @function
 * @param {Array} tokens - The final array of design tokens
 * @param {object} settings - User configuration object
 * @returns {void} - Will write file to disk through writeFile()
 * @throws {Error} - When no than one token is provided
 */
export function writeTokens(tokens, settings) {
  if (tokens.length > 0) {
    tokens.forEach(token => {
      let tokenName = camelize(token.name);
      tokenName = formatName(tokenName);

      const processedToken = processTokens(token, tokenName, settings);

      writeFile(
        processedToken,
        settings.outputFolderTokens,
        tokenName,
        true,
        settings.outputTokenFormat
      );
    });
  } else {
    throw new Error(errorWriteTokens);
  }
}
