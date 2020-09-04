import { Config } from '../../contracts/Config';
import { FRAME as Frame } from '../../contracts/Figma';
import { WriteOperation } from '../../contracts/Write';

import { processTokens } from '../../usecases/interactors/tokens/processTokens';

import { writeFile } from './writeFile';
import { camelize } from '../string/camelize';

import { acceptedTokenTypes } from '../system/acceptedTokenTypes';
import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../errors/errors';

/**
 * @description Write tokens to file
 *
 * @param tokens The final array of design tokens
 * @param config User configuration object
 */
export async function writeTokens(tokens: Frame[], config: Config): Promise<boolean> {
  if (!tokens) throw new Error(ErrorWriteTokens);
  if (!(tokens.length > 0)) throw new Error(ErrorWriteTokens);
  if (!config) throw new Error(ErrorWriteTokensNoSettings);

  return new Promise((resolve, reject) => {
    try {
      tokens.forEach(async (token) => {
        const tokenName = camelize(token.name).toLowerCase();

        if (acceptedTokenTypes.includes(tokenName)) {
          const processedToken = processTokens(token, tokenName, config);
          if (config.debugMode) console.log(processedToken);

          const writeOperation: WriteOperation = {
            type: 'token',
            file: processedToken,
            path: config.outputFolderTokens,
            name: tokenName,
            format: config.outputTokenFormat
          };

          await writeFile(writeOperation);
        }
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
