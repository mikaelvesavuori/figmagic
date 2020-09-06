import { Config } from '../../../contracts/Config';
import { FRAME as Frame } from '../../../contracts/Figma';
import { WriteOperation } from '../../../contracts/Write';

import { processTokens } from './processTokens';

import { writeFile } from '../../../frameworks/filesystem/writeFile';
import { camelize } from '../../../frameworks/string/camelize';
import { acceptedTokenTypes } from '../../../frameworks/system/acceptedTokenTypes';

import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../../../frameworks/errors/errors';

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

  return new Promise((resolve) => {
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
      throw new Error(error);
    }
  });
}
