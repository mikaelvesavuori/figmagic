import { FigmaData } from '../contracts/FigmaData';
import { Config } from '../contracts/Config';
import { Element, GraphicElementsMap } from '../contracts/Element';

import { createPage } from './interactors/common/createPage';
import { processElements } from './interactors/elements/processElements';
import { writeElements } from './interactors/elements/writeElements';
import { processGraphicElementsMap } from './interactors/elements/processGraphicElementsMap';
import { writeGraphicElementsMap } from './interactors/elements/writeGraphicElementsMap';

import { refresh } from '../frameworks/filesystem/refresh';

import { MsgSyncElements } from '../frameworks/messages/messages';
import { ErrorCreateElements } from '../frameworks/errors/errors';
import { FigmagicElement } from '../contracts/FigmagicElement';

/**
 * @description Use case for syncing (creating) React elements from Figma files
 */
export async function createElements(config: Config, data: FigmaData): Promise<void> {
  try {
    if (!config || !data) throw Error(ErrorCreateElements);
    console.log(MsgSyncElements);
  } catch (error: any) {
    throw Error(error);
  }

  try {
    const { outputFolderElements, outputFormatGraphics, outputGraphicElements, syncGraphics } =
      config;

    refresh(outputFolderElements, false);
    const { components }: any = data;
    await handleElements({
      children: data.document.children,
      pageName: 'Elements',
      config,
      components
    } as Element);

    /**
     * Handle a bit of a special corner case: SVG graphics packed into React components.
     */
    if (outputGraphicElements && outputFormatGraphics === 'svg' && syncGraphics) {
      const GRAPHICS = await handleElements({
        children: data.document.children,
        pageName: 'Graphics',
        config,
        components,
        isGeneratingGraphics: true
      });

      /**
       * The user can also further choose to create an object that exports all graphical React components.
       */
      if (config.outputGraphicElementsMap)
        handleGraphicElementsMap({ config, graphics: GRAPHICS } as GraphicElementsMap);
    }
  } catch (error: any) {
    throw Error(error);
  }
}

async function handleElements(element: Element): Promise<FigmagicElement[]> {
  const { children, pageName, config, components, isGeneratingGraphics } = element;

  const PAGE = createPage(children, pageName);
  const ELEMENTS = processElements(PAGE, config, components, isGeneratingGraphics || false);
  writeElements(ELEMENTS, config, isGeneratingGraphics);

  // Ugly hack to enforce this files settle as we get a race condition if setting "outputGraphicElements" to true
  // TODO: Make this correct and not like a hack
  await wait(2500);

  return ELEMENTS;
}

function handleGraphicElementsMap(graphicElementsMap: GraphicElementsMap) {
  const { config, graphics } = graphicElementsMap;

  const FOLDER = `${config.outputFolderElements}/Graphics`;
  const FILE_PATH = `${FOLDER}/index.${config.outputFormatElements}`;
  const FILE_CONTENT = processGraphicElementsMap(graphics);

  writeGraphicElementsMap(FOLDER, FILE_PATH, FILE_CONTENT);
}

const wait = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));
