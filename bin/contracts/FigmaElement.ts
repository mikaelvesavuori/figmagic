import { FRAME as Frame } from './Figma';

/**
 * The FigmaElement interface is for elements that have an added description, but are otherwise unaltered from how they appear from Figma's API.
 */
export interface FigmaElement {
  id: string;
  name: string;
  type: string;
  description?: string;
  children?: Frame[];
}
