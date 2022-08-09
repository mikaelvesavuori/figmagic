import { Imports } from './Imports';

/**
 * Initial mapping of CSS and imports.
 */
export type TokenMatchRaw = {
  css: string;
  imports: Imports[];
};

/**
 * The final output of a match.
 */
export type TokenMatch = {
  updatedCss: string;
  updatedImports: Imports[];
};
