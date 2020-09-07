import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';
import { FRAME as Frame } from '../contracts/Figma';

import { createPage } from './interactors/common/createPage';
//import { writeTokens } from './interactors/tokens/_writeTokens';
import { processTokens } from './interactors/tokens/processTokens';

import { refresh } from '../frameworks/filesystem/refresh';

import { MsgWriteTokens } from '../frameworks/messages/messages';
import { ErrorCreateTokens } from '../frameworks/errors/errors';
import { writeTokens } from './interactors/tokens/_writeTokens';

/**
 * @description Use case for creating token files from Figma
 *
 * @param config User configuration
 * @param data Data from Figma
 */
export async function createTokens(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw new Error(ErrorCreateTokens);
    console.log(MsgWriteTokens);

    await refresh(config.outputFolderTokens);
    const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
    const tokens = processTokens(tokensPage, config);

    console.log('|||||');
    console.log(tokens);
    throw new Error('STOP');

    /*
    const writeOperation: WriteOperation = {
      type: 'token',
      file: processedToken,
      path: config.outputFolderTokens,
      name: TOKEN_NAME,
      format: config.outputTokenFormat
    };

    writeFile(writeOperation);
    */

    writeTokens(tokens, config);
  } catch (error) {
    throw new Error(error);
  }
}
