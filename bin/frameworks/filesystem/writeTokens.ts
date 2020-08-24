import { Config } from '../../entities/Config/Config';

import { camelize } from '../string/camelize';
import { processTokens } from '../../app/process/processTokens';
import { writeFile } from './writeFile';

import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../../app/errors/errors';
import { acceptedTokenTypes } from '../../app/system/acceptedTokenTypes';

/**
 * @description Write tokens to file
 *
 * @param tokens The final array of design tokens
 * @param config User configuration object
 */
export async function writeTokens(tokens: any[], config: Config): Promise<boolean> {
  if (!tokens) throw new Error(ErrorWriteTokens);
  if (!(tokens.length > 0)) throw new Error(ErrorWriteTokens);
  if (!config) throw new Error(ErrorWriteTokensNoSettings);

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
