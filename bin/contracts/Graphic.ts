import { Config } from './Config';
import { FigmagicElement } from './FigmagicElement';

export interface Graphic extends FigmagicElement {
  config: Config;
}
