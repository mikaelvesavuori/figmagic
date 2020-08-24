import { Config } from '../../entities/Config/Config';
import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { createPage } from '../process/createPage';
import { processGraphics } from '../process/processGraphics';
import { refresh } from '../../frameworks/filesystem/refresh';
import { writeGraphics } from '../../frameworks/filesystem/writeGraphics';

import { MsgSyncGraphics } from '../messages/messages';

/**
 * @description TODO
 *
 * @param config
 * @param data
 * @param outputFolder
 */
export async function doSyncGraphics(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(MsgSyncGraphics);
  try {
    const graphicsPage = createPage(data.document.children, 'Graphics');
    await refresh(outputFolder);
    const fileList = await processGraphics(graphicsPage, config);
    await writeGraphics(fileList, config);
  } catch (error) {
    throw new Error(error);
  }
}
