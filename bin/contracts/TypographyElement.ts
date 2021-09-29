import { FRAME as Frame } from './Figma';

import { LetterSpacingUnits, OutputFormatTokens, OutputFormatColors } from './Config';

export type TypographyElement = {
  letterSpacingUnit: LetterSpacingUnits;
  outputFolderTokens: string;
  outputFormatTokens: OutputFormatTokens;
  outputFormatColors: OutputFormatColors;
  remSize: number;
  textElement: Frame;
  usePostscriptFontNames: boolean;
};
