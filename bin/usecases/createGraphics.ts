import { Config } from '../contracts/Config';
import { FigmaData } from '../contracts/FigmaData';

import { createPage } from './interactors/common/createPage';
import { processGraphics } from './interactors/graphics/processGraphics';
import { writeGraphics } from './interactors/graphics/writeGraphics';

import { refresh } from '../frameworks/filesystem/refresh';

import { ErrorCreateGraphics } from '../frameworks/errors/errors';
import { MsgSyncGraphics } from '../frameworks/messages/messages';

/**
 * @description Use case for syncing (creating) graphics from Figma file
 */
export async function createGraphics(
  config: Config,
  data: FigmaData,
): Promise<void> {
  if (!config || !data) throw Error(ErrorCreateGraphics);
  console.log(MsgSyncGraphics);

  const { outputFolderGraphics } = config;
  refresh(outputFolderGraphics);
  const graphicsPage = createPage(data.document.children, 'Graphics');
  const fileList = await processGraphics(graphicsPage, config);

  await writeGraphics(fileList, config);
}
