import { Config } from '../../entities/Config/Config';
import { FRAME as Frame } from '../../app/contracts/Figma';

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

  console.log('tokens.length', tokens.length);

  return new Promise((resolve, reject) => {
    try {
      //tokens.forEach(async (token) => {
      tokens[0].children.forEach(async (token) => {
        console.log('TOKEN');
        console.log(token);

        const tokenName = camelize(token.name).toLowerCase();

        console.log('acceptedTokenTypes', acceptedTokenTypes);
        console.log('tokenName', tokenName);
        console.log(
          'acceptedTokenTypes.includes(tokenName)',
          acceptedTokenTypes.includes(tokenName)
        );

        if (acceptedTokenTypes.includes(tokenName)) {
          const processedToken = processTokens(token, tokenName, config);

          if (config.debugMode) console.log(processedToken);

          console.log('processedToken', processedToken);

          await writeFile(
            processedToken,
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
