import { FigmaElement } from './FigmaElement';

/**
 * The FigmagicElement interface is used after parsing, and before writing elements.
 * It adds the necessary metadata to output needed files onto the standard Figma element data.
 */
export interface FigmagicElement extends FigmaElement {
  element?: string;
  imports?: string[];
  css?: string;
  html?: string;
  text?: string;
  extraProps?: string;
  /*
  id: string;
  name: string;
  description?: string;
  element?: string;
  imports?: string[];
  css?: string;
  html?: string;
  text?: string;
  extraProps?: string;
  */
}
