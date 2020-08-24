import { Config } from '../../entities/Config/Config';
import { FigmaData } from '../../entities/FigmaData/FigmaData';

import { createPage } from '../process/createPage';
import { processElements } from '../process/processElements';
import { createFolder } from '../../frameworks/filesystem/createFolder';
import { writeElements } from '../../frameworks/filesystem/writeElements';

import { MsgSyncElements } from '../messages/messages';

/**
 * @description TODO
 *
 * @param config
 * @param data
 * @param outputFolder
 */
export async function doSyncElements(
  config: Config,
  data: FigmaData,
  outputFolder: string
): Promise<void> {
  console.log(MsgSyncElements);

  try {
    const { components } = data;
    const elementsPage = createPage(data.document.children, 'Elements');
    const elements = await processElements(elementsPage, config, components);
    await createFolder(outputFolder);
    await writeElements(elements, config);
  } catch (error) {
    throw new Error(error);
  }
}
