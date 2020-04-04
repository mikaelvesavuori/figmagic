export const defaultConfig = {
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
  recompileLocal: false,
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
    react: false,
    styled: false,
    css: false,
    storybook: false,
    description: false,
    forceUpdate: true
  }
};
