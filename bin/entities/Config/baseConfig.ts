import { Config } from '../../contracts/Config';

export const baseConfig: Config = {
  debugMode: false,
  fontUnit: 'rem',
  letterSpacingUnit: 'em',
  opacitiesUnit: 'float',
  outputFileName: 'figma.json',
  outputFolderBaseFile: '.figmagic',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFolderTokens: 'tokens',
  outputFormatCss: 'ts',
  outputFormatElements: 'tsx',
  outputFormatGraphics: 'svg',
  outputFormatTokens: 'ts',
  outputScaleGraphics: 1,
  outputDataTypeToken: null,
  recompileLocal: false,
  remSize: 16,
  skipFileGeneration: {
    forceUpdate: true,
    skipCss: false,
    skipDescription: false,
    skipReact: false,
    skipStorybook: false,
    skipStyled: false
  },
  spacingUnit: 'rem',
  syncElements: false,
  syncGraphics: false,
  syncTokens: false,
  templates: {
    templatePathReact: 'templates/react.jsx',
    templatePathStorybook: 'templates/story.js',
    templatePathStyled: 'templates/styled.jsx'
  },
  token: '',
  url: '',
  usePostscriptFontNames: false
};
