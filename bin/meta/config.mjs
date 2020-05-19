export const defaultConfig = {
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
  outputTokenDataType: null,
  outputScaleGraphics: 1,
  recompileLocal: false,
  remSize: 16,
  skipFileGeneration: {
    react: false,
    styled: false,
    css: false,
    storybook: false,
    description: false,
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
