import { makeToken } from '../../../entities/Token/index';
import { WriteOperation } from '../../../contracts/Write';

import { Config } from '../../../contracts/Config';
import { FRAME as Frame } from '../../../contracts/Figma';

import { camelize } from '../../../frameworks/string/camelize';
import { acceptedTokenTypes } from '../../../frameworks/system/acceptedTokenTypes';

import { ErrorWriteTokens, ErrorWriteTokensNoSettings } from '../../../frameworks/errors/errors';

/**
 * @description Process tokens (before writing them to file; handled in another function)
 */
export function processTokens(tokens: Frame[], config: Config): any {
  try {
    if (!tokens) throw new Error(ErrorWriteTokens);
    if (!(tokens.length > 0)) throw new Error(ErrorWriteTokens);
    if (!config) throw new Error(ErrorWriteTokensNoSettings);

    const PROCESSED_TOKENS: WriteOperation[] = [];

    tokens.forEach((tokenFrame) => {
      const TOKEN_NAME = camelize(tokenFrame.name);

      // Skip any design token frames that begin with an underscore
      if (tokenFrame.type.toUpperCase() === 'FRAME' && TOKEN_NAME[0] === '_') return;

      if (acceptedTokenTypes.includes(TOKEN_NAME.toLowerCase()) && TOKEN_NAME[0] !== '_') {
        const TOKEN = makeToken(tokenFrame, TOKEN_NAME, config);
        const WRITE_OP = TOKEN.getWriteOperation();
        if (WRITE_OP) PROCESSED_TOKENS.push(WRITE_OP);
      }
    });

    return PROCESSED_TOKENS;
  } catch (error) {
    throw new Error(error);
  }
}
