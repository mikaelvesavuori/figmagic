"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCliArgs = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function parseCliArgs(argsArray) {
    if (!argsArray)
        throw new Error(errors_1.ErrorParseCliArgs);
    if (argsArray.length === 0)
        return {};
    const cliArguments = {
        '--debug': () => (config.debugMode = true),
        '-d': () => (config.debugMode = true),
        '--fontUnit': (val) => (config.fontUnit = val.toLowerCase()),
        '-fu': (val) => (config.fontUnit = val.toLowerCase()),
        '--letterSpacingUnit': (val) => (config.letterSpacingUnit = val.toLowerCase()),
        '-lsu': (val) => (config.letterSpacingUnit = val.toLowerCase()),
        '--opacitiesUnit': (val) => (config.opacitiesUnit = val.toLowerCase()),
        '-ou': (val) => (config.opacitiesUnit = val.toLowerCase()),
        '--figmaData': (val) => (config.figmaData = val),
        '-data': (val) => (config.figmaData = val),
        '--figmagicFolder': (val) => (config.figmagicFolder = val),
        '-base': (val) => (config.figmagicFolder = val),
        '--outputFolderElements': (val) => (config.outputFolderElements = val),
        '-elements': (val) => (config.outputFolderElements = val),
        '--outputFolderGraphics': (val) => (config.outputFolderGraphics = val),
        '-graphics': (val) => (config.outputFolderGraphics = val),
        '--outputFolderTokens': (val) => (config.outputFolderTokens = val),
        '-tokens': (val) => (config.outputFolderTokens = val),
        '--outputFormatCss': (val) => (config.outputFormatCss = val.toLowerCase()),
        '-fc': (val) => (config.outputFormatCss = val.toLowerCase()),
        '--outputFormatDesc': (val) => (config.outputFormatDescription = val.toLowerCase()),
        '-fd': (val) => (config.outputFormatDescription = val.toLowerCase()),
        '--outputFormatElements': (val) => (config.outputFormatElements = val.toLowerCase()),
        '-fe': (val) => (config.outputFormatElements = val.toLowerCase()),
        '--outputFormatGraphics': (val) => (config.outputFormatGraphics = val.toLowerCase()),
        '-fg': (val) => (config.outputFormatGraphics = val.toLowerCase()),
        '--outputFormatStorybook': (val) => (config.outputFormatStorybook = val.toLowerCase()),
        '-fs': (val) => (config.outputFormatStorybook = val.toLowerCase()),
        '--outputFormatTokens': (val) => (config.outputFormatTokens = val.toLowerCase()),
        '-ft': (val) => (config.outputFormatTokens = val.toLowerCase()),
        '--outputGraphicElements': () => (config.outputGraphicElements = true),
        '-oge': () => (config.outputGraphicElements = true),
        '--outputGraphicElementsMap': () => (config.outputGraphicElementsMap = true),
        '-ogm': () => (config.outputGraphicElementsMap = true),
        '--outputScaleGraphics': (val) => (config.outputScaleGraphics = parseInt(val)),
        '-scale': (val) => (config.outputScaleGraphics = parseInt(val)),
        '--outputDataTypeToken': (val) => (config.outputDataTypeToken = val.toLowerCase()),
        '-tokentype': (val) => (config.outputDataTypeToken = val.toLowerCase()),
        '--recompileLocal': () => (config.recompileLocal = true),
        '-local': () => (config.recompileLocal = true),
        '--remSize': (val) => (config.remSize = parseInt(val)),
        '-rem': (val) => (config.remSize = parseInt(val)),
        '--forceUpdate': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { forceUpdate: true })),
        '-force': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { forceUpdate: true })),
        '--skipCss': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipCss: true })),
        '-nocss': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipCss: true })),
        '--skipDescription': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipDescription: true })),
        '-nodesc': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipDescription: true })),
        '--skipReact': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipReact: true })),
        '-noreact': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipReact: true })),
        '--skipStorybook': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipStorybook: true })),
        '-nostory': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipStorybook: true })),
        '--skipStyled': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipStyled: true })),
        '-nostyled': () => (config.skipFileGeneration = Object.assign(Object.assign({}, config.skipFileGeneration), { skipStyled: true })),
        '--spacingUnit': (val) => (config.spacingUnit = val.toLowerCase()),
        '-s': (val) => (config.spacingUnit = val.toLowerCase()),
        '--syncElements': () => (config.syncElements = true),
        '-se': () => (config.syncElements = true),
        '--syncGraphics': () => (config.syncGraphics = true),
        '-sg': () => (config.syncGraphics = true),
        '--syncTokens': () => (config.syncTokens = true),
        '-st': () => (config.syncTokens = true),
        '--templatePathReact': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathReact: val })),
        '-tpreact': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathReact: val })),
        '--templatePathStorybook': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathStorybook: val })),
        '-tpstory': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathStorybook: val })),
        '--templatePathStyled': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathStyled: val })),
        '-tpstyled': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathStyled: val })),
        '--templatePathGraphic': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathGraphic: val })),
        '-tpgraphic': (val) => (config.templates = Object.assign(Object.assign({}, config.templates), { templatePathGraphic: val })),
        '--token': (val) => (config.token = val),
        '-t': (val) => (config.token = val),
        '--unitlessPrecision': (val) => (config.unitlessPrecision = parseInt(val, 10)),
        '-up': (val) => (config.unitlessPrecision = parseInt(val, 10)),
        '--url': (val) => (config.url = val),
        '-u': (val) => (config.url = val),
        '--usePostscriptFontNames': () => (config.usePostscriptFontNames = true),
        '-ps': () => (config.usePostscriptFontNames = true)
    };
    const config = {};
    argsArray.forEach((arg, index) => {
        if (cliArguments.hasOwnProperty(arg)) {
            cliArguments[arg](argsArray[index + 1]);
        }
    });
    return config;
}
exports.parseCliArgs = parseCliArgs;
//# sourceMappingURL=parseCliArgs.js.map