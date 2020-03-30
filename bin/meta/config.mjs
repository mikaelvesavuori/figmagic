export const defaultConfig = {
  defaultOutputTokenFormat: 'mjs',
  defaultFontUnit: 'rem',
  defaultRemSize: 16,
  defaultSpacingUnit: 'rem',
  defaultSyncElements: false,
  defaultSyncGraphics: false,
  defaultOutputFileName: 'figma.json',
  defaultOutputFolderBaseFile: 'figma',
  defaultOutputFolderTokens: 'tokens',
  defaultOutputFolderElements: 'elements',
  defaultOutputFolderGraphics: 'graphics',
  defaultOutputFormatGraphics: 'svg',
  defaultOutputScaleGraphics: 1,
  defaultUsePostscriptFontNames: false,
  templates: {
    defaultTemplatePathReact: 'templates/react.jsx',
    defaultTemplatePathStyled: 'templates/styled.jsx',
    defaultTemplatePathStorybook: 'templates/story.js'
  },
  skipFileGeneration: {
    defaultSkipReact: false,
    defaultSkipStyled: false,
    defaultSkipCss: false,
    defaultSkipStorybook: false,
    defaultSkipDescription: false
  }
};
