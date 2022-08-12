import { makeToken } from '../../../entities/Token/index';
import { WriteOperation } from '../../../contracts/Write';

import { Config } from '../../../contracts/Config';
import { FRAME as Frame } from '../../../contracts/Figma';

import { sanitizeString } from '../../../frameworks/string/sanitizeString';
import { acceptedTokenTypes } from '../../../frameworks/system/acceptedTokenTypes';

import { ErrorWriteTokensNoSettings } from '../../../frameworks/errors/errors';

/**
 * @description Process tokens (before writing them to file; handled in another function)
 */
export function processTokens(tokens: Frame[], config: Config): WriteOperation[] {
  if (!config) throw Error(ErrorWriteTokensNoSettings);
  if (!tokens) return [];

  const processedTokens: WriteOperation[] = [];

  tokens.forEach((tokenFrame) => {
    const tokenName = sanitizeString(tokenFrame.name);

    // Skip any design token frames that begin with an underscore
    if (tokenFrame.type.toUpperCase() === 'FRAME' && tokenName[0] === '_') return;

    if (acceptedTokenTypes.includes(tokenName.toLowerCase()) && tokenName[0] !== '_') {
      const token = makeToken(tokenFrame, tokenName, config);
      const writeOperation = token.getWriteOperation();
      if (writeOperation) processedTokens.push(writeOperation);
    }
  });

  return processedTokens;
}
