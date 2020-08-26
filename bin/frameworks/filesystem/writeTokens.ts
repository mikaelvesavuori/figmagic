import { Config } from '../../entities/Config/Config';
import { Frame } from '../../app/contracts/Frame';

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
      tokens.forEach(async (token) => {
        const tokenName = camelize(token.name).toLowerCase();

        if (acceptedTokenTypes.includes(tokenName)) {
          const processedToken = processTokens(token, tokenName, config);

          if (config.debugMode) console.log(processedToken);

          await writeFile(
            JSON.stringify(processedToken),
            config.outputFolderTokens,
            tokenName,
            'token',
            config.outputTokenFormat
            //{ dataType: config.outputTokenDataType } // TODO: Fix this, do corrections on Templates contract?
          );
        }
      });

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });
}
