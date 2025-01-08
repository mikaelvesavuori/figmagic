import { Config } from '../contracts/Config';
import { FRAME as Frame } from '../contracts/Figma';
import { FigmaData } from '../contracts/FigmaData';

import { createPage } from './interactors/common/createPage';
import { processTokens } from './interactors/tokens/processTokens';
import { writeTokens } from './interactors/tokens/writeTokens';

import { refresh } from '../frameworks/filesystem/refresh';

import { ErrorCreateTokens } from '../frameworks/errors/errors';
import {
  MsgNoTokensFound,
  MsgWriteTokens,
} from '../frameworks/messages/messages';

/**
 * @description Use case for creating token files from Figma
 */
export async function createTokens(
  config: Config,
  data: FigmaData,
): Promise<void> {
  if (!config || !data) throw Error(ErrorCreateTokens);
  console.log(MsgWriteTokens);

  const { outputFolderTokens } = config;
  refresh(outputFolderTokens);
  const tokensPage: Frame[] = createPage(
    data.document.children,
    'Design Tokens',
  );
  const processedTokens = processTokens(tokensPage, config);

  if (processedTokens && processedTokens.length > 0)
    writeTokens(processedTokens);
  else console.warn(MsgNoTokensFound);
}
