"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.baseConfig = void 0;
exports.baseConfig = {
    debugMode: false,
    fontUnit: 'rem',
    letterSpacingUnit: 'em',
    opacitiesUnit: 'float',
    figmaData: 'figma.json',
    figmagicFolder: '.figmagic',
    outputFolderElements: 'elements',
    outputFolderGraphics: 'graphics',
    outputFolderTokens: 'tokens',
    outputFormatCss: 'ts',
    outputFormatDescription: 'md',
    outputFormatElements: 'tsx',
    outputFormatGraphics: 'svg',
    outputFormatStorybook: 'js',
    outputFormatTokens: 'ts',
    outputGraphicElements: false,
    outputGraphicElementsMap: false,
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
    syncTokens: true,
    templates: {
        templatePathGraphic: 'templates/graphic',
        templatePathReact: 'templates/react',
        templatePathStorybook: 'templates/story',
        templatePathStyled: 'templates/styled'
    },
    token: '',
    url: '',
    usePostscriptFontNames: false
};
//# sourceMappingURL=baseConfig.js.map