import { FRAME as Frame } from '../../../contracts/Figma';
import { FigmagicElement } from '../../../contracts/FigmagicElement';
import { Config } from '../../../contracts/Config';
export declare function processElements(elementsPage: Frame[], config: Config, components: Record<string, any>, isGraphicElement?: boolean): FigmagicElement[];
