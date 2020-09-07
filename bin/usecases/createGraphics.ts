import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createPage } from './interactors/common/createPage';
import { processGraphics } from './interactors/graphics/processGraphics';

import { refresh } from '../frameworks/filesystem/refresh';
import { writeGraphics } from './interactors/graphics/writeGraphics';

import { MsgSyncGraphics } from '../frameworks/messages/messages';
import { ErrorCreateGraphics } from '../frameworks/errors/errors';

/**
 * @description Use case for syncing (creating) graphics from Figma file
 *
 * @param config User configuration
 * @param data Data from Figma
 */
export async function createGraphics(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw new Error(ErrorCreateGraphics);
    console.log(MsgSyncGraphics);

    await refresh(config.outputFolderGraphics);
    const graphicsPage = createPage(data.document.children, 'Graphics');
    const fileList = await processGraphics(graphicsPage, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
