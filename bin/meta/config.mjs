export const defaultConfig = {
  debugMode: false,
  fontUnit: 'rem',
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
    defaultSkipReact: false,
    defaultSkipStyled: false,
    defaultSkipCss: false,
    defaultSkipStorybook: false,
    defaultSkipDescription: false,
    defaultForceUpdate: true
  },
  spacingUnit: 'rem',
  syncElements: false,
  syncGraphics: false,
  templates: {
    defaultTemplatePathReact: 'templates/react.jsx',
    defaultTemplatePathStyled: 'templates/styled.jsx',
    defaultTemplatePathStorybook: 'templates/story.js'
  },
  usePostscriptFontNames: false
};
