export type Config = {
  debugMode: boolean;
  camelizeTokenNames: boolean;
  borderWidthUnit: BorderWidthUnit;
  fontUnit: FontUnits;
  letterSpacingUnit: LetterSpacingUnit;
  lineHeightUnit: LineHeightUnit;
  opacitiesUnit: OpacitiesUnit;
  radiusUnit: RadiusUnit;
  shadowUnit: ShadowUnit;
  durationUnit: DurationUnit;
  spacingUnit: SpacingUnit;
  figmaData: string;
  figmagicFolder: string;
  outputFolderElements: string;
  outputFolderGraphics: string;
  outputFolderTokens: string;
  outputFormatColors: OutputFormatColors;
  outputFormatCss: OutputFormatCss;
  outputFormatDescription: OutputFormatDescription;
  outputFormatElements: OutputFormatElements;
  outputFormatGraphics: OutputFormatGraphics;
  outputFormatStorybook: OutputFormatStorybook;
  outputFormatTokens: OutputFormatTokens;
  outputGraphicElements: boolean;
  outputGraphicElementsMap: boolean;
  outputScaleGraphics: number;
  outputDataTypeToken: OutputDataTypeToken;
  overwrite: Overwrite;
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
  syncElements: boolean;
  syncGraphics: boolean;
  syncTokens: boolean;
  templates: {
    templatePathGraphic: string;
    templatePathReact: string;
    templatePathStorybook: string;
    templatePathStyled: string;
  };
  token: string | null;
  tokensRelativeImportPrefix: string;
  unitlessPrecision: number;
  url: string | null;
  usePostscriptFontNames: boolean;
  useLiteralFontFamilies: boolean;
  versionName: string | null;
};

export type ConfigDTO = {
  debugMode?: boolean;
  camelizeTokenNames?: boolean;
  borderWidthUnit?: BorderWidthUnit;
  fontUnit?: FontUnits;
  letterSpacingUnit?: LetterSpacingUnit;
  lineHeightUnit?: LineHeightUnit;
  opacitiesUnit?: OpacitiesUnit;
  radiusUnit?: RadiusUnit;
  shadowUnit?: ShadowUnit;
  durationUnit?: DurationUnit;
  spacingUnit?: SpacingUnit;
  figmaData?: string;
  figmagicFolder?: string;
  outputFolderElements?: string;
  outputFolderGraphics?: string;
  outputFolderTokens?: string;
  outputFormatColors?: OutputFormatColors;
  outputFormatCss?: OutputFormatCss;
  outputFormatDescription?: OutputFormatDescription;
  outputFormatElements?: OutputFormatElements;
  outputFormatGraphics?: OutputFormatGraphics;
  outputFormatStorybook?: OutputFormatStorybook;
  outputFormatTokens?: OutputFormatTokens;
  outputGraphicElements?: boolean;
  outputGraphicElementsMap?: boolean;
  outputScaleGraphics?: number;
  outputDataTypeToken?: OutputDataTypeToken;
  overwrite?: {
    css: boolean;
    description: boolean;
    graphic: boolean;
    react: boolean;
    storybook: boolean;
    styled: boolean;
  };
  recompileLocal?: boolean;
  remSize?: number;
  skipFileGeneration?: {
    forceUpdate?: boolean;
    skipCss?: boolean;
    skipDescription?: boolean;
    skipReact?: boolean;
    skipStorybook?: boolean;
    skipStyled?: boolean;
  };
  syncElements?: boolean;
  syncGraphics?: boolean;
  syncTokens?: boolean;
  templates?: {
    templatePathGraphic?: string;
    templatePathReact?: string;
    templatePathStorybook?: string;
    templatePathStyled?: string;
  };
  token?: string | null;
  tokensRelativeImportPrefix?: string | null;
  unitlessPrecision?: number;
  url?: string | null;
  usePostscriptFontNames?: boolean;
  useLiteralFontFamilies?: boolean;
  versionName?: string | null;
};

export type Overwrite = {
  css: boolean;
  description: boolean;
  graphic: boolean;
  react: boolean;
  storybook: boolean;
  styled: boolean;
};

export type BorderWidthUnit = 'rem' | 'em' | 'px';
export type ShadowUnit = 'rem' | 'em' | 'px';
export type DurationUnit = 's' | 'ms';
export type RadiusUnit = 'rem' | 'em' | 'px';
export type FontUnits = 'rem' | 'em' | 'px';
export type LetterSpacingUnit = 'em' | 'px';
export type LineHeightUnit = 'unitless' | 'px' | 'rem' | 'em';
export type OpacitiesUnit = 'float' | 'percent';
export type SpacingUnit = 'rem' | 'em' | 'px';

export type OutputFormatColors = 'hex' | 'rgba';
export type OutputFormatCss = 'ts' | 'mjs' | 'js';
export type OutputFormatDescription = 'md' | 'txt';
export type OutputFormatElements = 'tsx' | 'jsx';
export type OutputFormatGraphics = 'svg' | 'png';
export type OutputFormatStorybook = 'ts' | 'js' | 'mdx';
export type OutputFormatTokens = 'ts' | 'mjs' | 'js' | 'json' | 'css';
export type OutputDataTypeToken = null | 'enum';

export type TemplatesConfig = {
  templates: {
    templatePathGraphic: string;
    templatePathReact: string;
    templatePathStorybook: string;
    templatePathStyled: string;
  };
};
