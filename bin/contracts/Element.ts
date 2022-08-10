import { Config } from './Config';
import { Components, FRAME as Frame } from './Figma';
import { Graphic } from './Graphic';

export type Element = {
  children: Frame[];
  pageName: string;
  config: Config;
  components: Components;
  isGeneratingGraphics?: boolean;
};

export type GraphicElementsMap = {
  config: Config;
  graphics: Graphic[];
};
