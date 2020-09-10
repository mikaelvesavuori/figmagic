import { makeToken } from '../../../entities/Token/index';
import { Token } from '../../../entities/Token/index';

import { Config } from '../../../contracts/Config';
import { FRAME as Frame } from '../../../contracts/Figma';

import { camelize } from '../../../frameworks/string/camelize';
import { acceptedTokenTypes } from '../../../frameworks/system/acceptedTokenTypes';

import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../../../frameworks/errors/errors';

/**
 * @description Write tokens to file
 *
 * @param tokens The final array of design tokens
 * @param config User configuration object
 */
export function processTokens(tokens: Frame[], config: Config): any {
  try {
    if (!tokens) throw new Error(ErrorWriteTokens);
    if (!(tokens.length > 0)) throw new Error(ErrorWriteTokens);
    if (!config) throw new Error(ErrorWriteTokensNoSettings);

    const processedTokens: Token[] = [];

    tokens.forEach((token) => {
      const TOKEN_NAME = camelize(token.name);
      if (acceptedTokenTypes.includes(TOKEN_NAME.toLowerCase())) {
        const _token = makeToken(token, TOKEN_NAME, config);
        processedTokens.push(_token.getWriteOperation());
      }
    });

    return processedTokens;
  } catch (error) {
    throw new Error(error);
  }
}
