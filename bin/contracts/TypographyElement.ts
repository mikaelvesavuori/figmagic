import { FRAME as Frame } from './Figma';

export type TypographyElement = {
  letterSpacingUnit: 'em' | 'px';
  outputFolderTokens: string;
  outputFormatTokens: 'ts' | 'mjs' | 'js';
  remSize: number;
  textElement: Frame;
  usePostscriptFontNames: boolean;
};
