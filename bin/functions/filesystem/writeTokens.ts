import { camelize } from '../helpers/camelize';
import { processTokens } from '../process/processTokens';
import { writeFile } from './writeFile';

import { errorWriteTokens, errorWriteTokensNoSettings } from '../../meta/errors';
import { acceptedTokenTypes } from '../../meta/acceptedTokenTypes';

import { Config } from '../../app/contracts/config/Config';

/**
 * Write tokens to file
 *
 * @exports
 * @async
 * @function
 * @param {array} tokens - The final array of design tokens
 * @param {object} config - User configuration object
 * @returns {boolean} - Returns true when finished
 * @throws {errorWriteTokens} - Throws error when no tokens are provided
 * @throws {errorWriteTokens} - Throws error when tokens are zero-length
 * @throws {errorWriteTokensNoSettings} - Throws error when missing config
 */
export async function writeTokens(tokens: any[], config: Config): Promise<boolean> {
  if (!tokens) throw new Error(errorWriteTokens);
  if (!(tokens.length > 0)) throw new Error(errorWriteTokens);
  if (!config) throw new Error(errorWriteTokensNoSettings);

  return new Promise((resolve, reject) => {
    try {
      tokens.forEach(async (token) => {
        const tokenName = camelize(token.name);

        if (acceptedTokenTypes.includes(tokenName.toLowerCase())) {
          const PROCESSED_TOKEN = processTokens(token, tokenName, config);

          if (config.debugMode) console.log(PROCESSED_TOKEN);

          await writeFile(
            PROCESSED_TOKEN,
            config.outputFolderTokens,
            tokenName,
            'token',
            config.outputTokenFormat,
            { dataType: config.outputTokenDataType }
          );
        }
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
