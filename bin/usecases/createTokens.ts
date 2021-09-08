import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';
import { FRAME as Frame } from '../contracts/Figma';

import { createPage } from './interactors/common/createPage';
import { processTokens } from './interactors/tokens/processTokens';
import { writeTokens } from './interactors/tokens/writeTokens';

import { refresh } from '../frameworks/filesystem/refresh';

import { MsgWriteTokens, MsgNoTokensFound } from '../frameworks/messages/messages';
import { ErrorCreateTokens } from '../frameworks/errors/errors';

/**
 * @description Use case for creating token files from Figma
 */
export async function createTokens(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw Error(ErrorCreateTokens);
    console.log(MsgWriteTokens);

    const { outputFolderTokens } = config;
    refresh(outputFolderTokens);
    const tokensPage: Frame[] = createPage(data.document.children, 'Design Tokens');
    const processedTokens = processTokens(tokensPage, config);

    if (processedTokens && processedTokens.length > 0) writeTokens(processedTokens);
    else console.warn(MsgNoTokensFound);
  } catch (error: any) {
    throw Error(error);
  }
}
