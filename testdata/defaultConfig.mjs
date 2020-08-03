export const defaultConfig = {
  token: null,
  url: null,
  debugMode: false,
  testMode: true,
  fontUnit: 'rem',
  remSize: 16,
  outputFileName: 'figma.json',
  outputFolderBaseFile: '.figmagic',
  outputFolderTokens: 'tokens',
  outputTokenFormat: 'mjs',
  outputFolderElements: 'elements',
  outputFolderGraphics: 'graphics',
  outputFormatGraphics: 'svg',
  outputScaleGraphics: 1,
  outputTokenDataType: null,
  recompileLocal: false,
  opacitiesUnit: 'percent',
  spacingUnit: 'rem',
  syncElements: true,
  syncGraphics: false,
  usePostscriptFontNames: true,
  templates: {
    templatePathReact: 'templates/react.jsx',
    templatePathStyled: 'templates/styled.jsx',
    templatePathStorybook: 'templates/story.js'
  },
  skipFileGeneration: {
    skipReact: false,
    skipStyled: false,
    skipCss: false,
    skipStorybook: false,
    skipDescription: false,
    forceUpdate: true
  }
};
