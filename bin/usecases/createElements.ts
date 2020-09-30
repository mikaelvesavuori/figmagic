import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';

import { createPage } from './interactors/common/createPage';
import { processElements } from './interactors/elements/processElements';
import { writeElements } from './interactors/elements/writeElements';

import { refresh } from '../frameworks/filesystem/refresh';

import { MsgSyncElements } from '../frameworks/messages/messages';
import { ErrorCreateElements } from '../frameworks/errors/errors';

/**
 * @description Use case for syncing (creating) React elements from Figma files
 */
export async function createElements(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw new Error(ErrorCreateElements);
    console.log(MsgSyncElements);
  } catch (error) {
    throw new Error(error);
  }

  try {
    await refresh(config.outputFolderElements);

    const { components }: any = data;

    const ELEMENTS_PAGE = createPage(data.document.children, 'Elements');
    const ELEMENTS = processElements(ELEMENTS_PAGE, config, components);
    writeElements(ELEMENTS, config);

    if (config.outputFormatGraphics === 'svg' && config.syncGraphics) {
      const GRAPHICS_PAGE = createPage(data.document.children, 'Graphics');
      const GRAPHICS = processElements(GRAPHICS_PAGE, config, components);
      writeElements(GRAPHICS, config, true);
    }
  } catch (error) {
    throw new Error(error);
  }
}
