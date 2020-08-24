// TODO: Check this

export type Config = {
  debugMode: boolean;
  fontUnit: 'rem' | 'em';
  letterSpacingUnit: 'em' | 'px';
  opacitiesUnit: 'float' | 'percent';
  outputFileName: string;
  outputFolderBaseFile: string;
  outputFolderElements: string;
  outputFolderGraphics: string;
  outputFolderTokens: string;
  outputFormatGraphics: 'svg' | 'png';
  outputScaleGraphics: number;
  outputTokenDataType: null | 'enum';
  outputTokenFormat: 'mjs' | 'js';
  recompileLocal: boolean;
  remSize: number;
  skipFileGeneration: {
    forceUpdate: boolean;
    skipCss: boolean;
    skipDescription: boolean;
    skipReact: boolean;
    skipStorybook: boolean;
    skipStyled: boolean;
  };
  spacingUnit: 'rem' | 'em';
  syncElements: boolean;
  syncGraphics: boolean;
  templates: {
    templatePathReact: string;
    templatePathStorybook: string;
    templatePathStyled: string;
  };
  testMode: boolean;
  token: string | null;
  url: string | null;
  usePostscriptFontNames: boolean;
};
