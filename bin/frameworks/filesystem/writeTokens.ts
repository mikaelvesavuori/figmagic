import { Config } from '../../entities/Config/Config';
import { FRAME as Frame } from '../../app/contracts/Figma';
import { WriteOperation } from '../../app/contracts/Write';

import { camelize } from '../string/camelize';
import { processTokens } from '../../app/process/processTokens';
import { writeFile } from './writeFile';

import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../errors/errors';
import { acceptedTokenTypes } from '../system/acceptedTokenTypes';

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
      // TODO: Improve syntax, "[0]"?
      tokens[0].children.forEach(async (token) => {
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
