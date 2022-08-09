import { FRAME as Frame } from './Figma';

export type Element = {
  children: Frame[];
  pageName: string;
  config: any;
  components: any;
  isGeneratingGraphics?: boolean;
};

export type GraphicElementsMap = {
  config: any;
  graphics: any;
};
