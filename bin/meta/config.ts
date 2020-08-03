import { Config } from '../app/contracts/config/Config';

export const defaultConfig: Config = {
  debugMode: false,
  fontUnit: 'rem',
  letterSpacingUnit: 'em',
  opacitiesUnit: 'float',
  outputTokenFormat: 'mjs',
  outputFileName: 'figma.json',
  outputFolderBaseFile: '.figmagic',
  outputFolderTokens: 'tokens',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFormatGraphics: 'svg',
  outputFolderComponents: '',
  outputTokenDataType: null,
  outputScaleGraphics: 1,
  recompileLocal: false,
  remSize: 16,
  skipFileGeneration: {
    skipReact: false,
    skipStyled: false,
    skipCss: false,
    skipStorybook: false,
    skipDescription: false,
    forceUpdate: true
  },
  spacingUnit: 'rem',
  syncElements: false,
  syncGraphics: false,
  templates: {
    templatePathReact: 'templates/react.jsx',
    templatePathStyled: 'templates/styled.jsx',
    templatePathStorybook: 'templates/story.js'
  },
  usePostscriptFontNames: false
};
