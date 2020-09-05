import { Css } from './Css';
import { Imports } from './Imports';

export interface ParsedElementMetadataInterface {
  css: Css | string;
  imports: Imports | any;
}
