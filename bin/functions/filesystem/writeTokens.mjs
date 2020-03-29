import { camelize } from '../helpers/camelize.mjs';
import { formatName } from '../helpers/formatName.mjs';
import { processTokens } from '../process/processTokens.mjs';
import { writeFile } from './writeFile.mjs';

import { errorWriteTokens, errorWriteTokensNoSettings } from '../../meta/errors.mjs';
import { acceptedTokenTypes } from '../../meta/acceptedTokenTypes.mjs';

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
export async function writeTokens(tokens, settings) {
  if (!tokens) throw new Error(errorWriteTokens);
  if (!(tokens.length > 0)) throw new Error(errorWriteTokens);
  if (!settings) throw new Error(errorWriteTokensNoSettings);

  const tokensToProcess = new Promise((resolve, reject) => {
    try {
      tokens.forEach(async token => {
        let tokenName = camelize(token.name);
        tokenName = formatName(tokenName);

        if (acceptedTokenTypes.includes(tokenName.toLowerCase())) {
          const PROCESSED_TOKEN = processTokens(token, tokenName, settings);

          await writeFile(
            PROCESSED_TOKEN,
            settings.outputFolderTokens,
            tokenName,
            'token',
            settings.outputTokenFormat
          );
        }
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

  return tokensToProcess.catch(error => console.error(error));
}
