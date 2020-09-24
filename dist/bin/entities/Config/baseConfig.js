"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = void 0;
exports.baseConfig = {
    debugMode: false,
    fontUnit: 'rem',
    letterSpacingUnit: 'em',
    opacitiesUnit: 'float',
    outputFileName: 'figma.json',
    outputFolderBaseFile: '.figmagic',
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
    token: '',
    url: '',
    usePostscriptFontNames: false
};
//# sourceMappingURL=baseConfig.js.map