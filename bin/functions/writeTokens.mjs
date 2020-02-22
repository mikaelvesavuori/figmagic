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
 * @param {array} tokens - The final array of design tokens
 * @param {object} settings - User configuration object
 * @returns {void} - Will write file to disk through writeFile()
 * @throws {error} - When no than one token is provided
 */
export function writeTokens(tokens, settings) {
  if (!tokens.length > 0) throw new Error(errorWriteTokens);

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
}
