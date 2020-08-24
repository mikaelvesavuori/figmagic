import { Config } from '../../entities/Config/Config';

export const defaultConfig: Config = {
  debugMode: false,
  fontUnit: 'rem',
  letterSpacingUnit: 'em',
  opacitiesUnit: 'float',
  outputFileName: 'figma.json',
  outputFolderBaseFile: '.figmagic',
  outputFolderComponents: '',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFolderTokens: 'tokens',
  outputFormatGraphics: 'svg',
  outputScaleGraphics: 1,
  outputTokenDataType: null,
  outputTokenFormat: 'mjs',
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
  templates: {
    templatePathReact: 'templates/react.jsx',
    templatePathStorybook: 'templates/story.js',
    templatePathStyled: 'templates/styled.jsx'
  },
  testMode: false,
  token: '',
  url: '',
  usePostscriptFontNames: false
};
