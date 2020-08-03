export type Config = {
  token: string | null;
  url: string | null;
  debugMode: boolean;
  fontUnit: 'rem' | 'em'; // ???
  letterSpacingUnit: 'em' | 'rem'; // ???
  opacitiesUnit: 'float' | 'percent';
  outputTokenFormat: 'mjs'; // ???
  outputFileName: string;
  outputFolderBaseFile: string;
  outputFolderTokens: string;
  outputFolderElements: string;
  outputFolderGraphics: string;
  outputFormatGraphics: 'svg'; // ???
  outputFolderComponents?: string; // ???
  outputTokenDataType: null; // ???
  outputScaleGraphics: number;
  recompileLocal: boolean;
  remSize: number;
  skipFileGeneration: {
    skipReact: boolean;
    skipStyled: boolean;
    skipCss: boolean;
    skipStorybook: boolean;
    skipDescription: boolean;
    forceUpdate: boolean;
  };
  spacingUnit: 'rem' | 'em';
  syncElements: boolean;
  syncGraphics: boolean;
  templates: {
    templatePathReact: string;
    templatePathStyled: string;
    templatePathStorybook: string;
  };
  usePostscriptFontNames: boolean;
};
