"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCliArgs = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function parseCliArgs(argsArray) {
    if (!argsArray)
        throw new Error(errors_1.ErrorParseCliArgs);
    if (argsArray.length === 0)
        return {};
    const config = {};
    const setConfigValue = (key, value) => {
        config[key] = value;
    };
    const cliArguments = {
        '--debug': () => setConfigValue('debugMode', true),
        '-d': () => setConfigValue('debugMode', true),
        '--fontUnit': (val) => setConfigValue('fontUnit', val.toLowerCase()),
        '-fu': (val) => setConfigValue('fontUnit', val.toLowerCase()),
        '--letterSpacingUnit': (val) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
        '-lsu': (val) => setConfigValue('letterSpacingUnit', val.toLowerCase()),
        '--opacitiesUnit': (val) => setConfigValue('opacitiesUnit', val.toLowerCase()),
        '-ou': (val) => setConfigValue('opacitiesUnit', val.toLowerCase()),
        '--figmaData': (val) => setConfigValue('figmaData', val),
        '-data': (val) => setConfigValue('figmaData', val),
        '--figmagicFolder': (val) => setConfigValue('figmagicFolder', val),
        '-base': (val) => setConfigValue('figmagicFolder', val),
        '--outputFolderElements': (val) => setConfigValue('outputFolderElements', val),
        '-elements': (val) => setConfigValue('outputFolderElements', val),
        '--outputFolderGraphics': (val) => setConfigValue('outputFolderGraphics', val),
        '-graphics': (val) => setConfigValue('outputFolderGraphics', val),
        '--outputFolderTokens': (val) => setConfigValue('outputFolderTokens', val),
        '-tokens': (val) => setConfigValue('outputFolderTokens', val),
        '--outputFormatCss': (val) => setConfigValue('outputFormatCss', val.toLowerCase()),
        '-fc': (val) => setConfigValue('outputFormatCss', val.toLowerCase()),
        '--outputFormatDesc': (val) => setConfigValue('outputFormatDescription', val.toLowerCase()),
        '-fd': (val) => setConfigValue('outputFormatDescription', val.toLowerCase()),
        '--outputFormatElements': (val) => setConfigValue('outputFormatElements', val.toLowerCase()),
        '-fe': (val) => setConfigValue('outputFormatElements', val.toLowerCase()),
        '--outputFormatGraphics': (val) => setConfigValue('outputFormatGraphics', val.toLowerCase()),
        '-fg': (val) => setConfigValue('outputFormatGraphics', val.toLowerCase()),
        '--outputFormatStorybook': (val) => setConfigValue('outputFormatStorybook', val.toLowerCase()),
        '-fs': (val) => setConfigValue('outputFormatStorybook', val.toLowerCase()),
        '--outputFormatTokens': (val) => setConfigValue('outputFormatTokens', val.toLowerCase()),
        '-ft': (val) => setConfigValue('outputFormatTokens', val.toLowerCase()),
        '--outputGraphicElements': () => setConfigValue('outputGraphicElements', true),
        '-oge': () => setConfigValue('outputGraphicElements', true),
        '--outputGraphicElementsMap': () => setConfigValue('outputGraphicElementsMap', true),
        '-ogm': () => setConfigValue('outputGraphicElementsMap', true),
        '--outputScaleGraphics': (val) => setConfigValue('outputScaleGraphics', parseInt(val)),
        '-scale': (val) => setConfigValue('outputScaleGraphics', parseInt(val)),
        '--outputDataTypeToken': (val) => setConfigValue('outputDataTypeToken', val.toLowerCase()),
        '-tokentype': (val) => setConfigValue('outputDataTypeToken', val.toLowerCase()),
        '--recompileLocal': () => setConfigValue('recompileLocal', true),
        '-local': () => setConfigValue('recompileLocal', true),
        '--remSize': (val) => setConfigValue('remSize', parseInt(val)),
        '-rem': (val) => setConfigValue('remSize', parseInt(val)),
        '--forceUpdate': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { forceUpdate: true })),
        '-force': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { forceUpdate: true })),
        '--skipCss': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipCss: true })),
        '-nocss': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipCss: true })),
        '--skipDescription': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipDescription: true })),
        '-nodesc': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipDescription: true })),
        '--skipReact': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipReact: true })),
        '-noreact': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipReact: true })),
        '--skipStorybook': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipStorybook: true })),
        '-nostory': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipStorybook: true })),
        '--skipStyled': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipStyled: true })),
        '-nostyled': () => setConfigValue('skipFileGeneration', Object.assign(Object.assign({}, config.skipFileGeneration), { skipStyled: true })),
        '--spacingUnit': (val) => setConfigValue('spacingUnit', val.toLowerCase()),
        '-s': (val) => setConfigValue('spacingUnit', val.toLowerCase()),
        '--syncElements': () => setConfigValue('syncElements', true),
        '-se': () => setConfigValue('syncElements', true),
        '--syncGraphics': () => setConfigValue('syncGraphics', true),
        '-sg': () => setConfigValue('syncGraphics', true),
        '--syncTokens': () => setConfigValue('syncTokens', true),
        '-st': () => setConfigValue('syncTokens', true),
        '--templatePathReact': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathReact: val })),
        '-tpreact': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathReact: val })),
        '--templatePathStorybook': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathStorybook: val })),
        '-tpstory': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathStorybook: val })),
        '--templatePathStyled': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathStyled: val })),
        '-tpstyled': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathStyled: val })),
        '--templatePathGraphic': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathGraphic: val })),
        '-tpgraphic': (val) => setConfigValue('templates', Object.assign(Object.assign({}, config.templates), { templatePathGraphic: val })),
        '--token': (val) => setConfigValue('token', val),
        '-t': (val) => setConfigValue('token', val),
        '--unitlessPrecision': (val) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
        '-up': (val) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
        '--url': (val) => setConfigValue('url', val),
        '-u': (val) => setConfigValue('url', val),
        '--usePostscriptFontNames': () => setConfigValue('usePostscriptFontNames', true),
        '-ps': () => setConfigValue('usePostscriptFontNames', true)
    };
    argsArray.forEach((arg, index) => {
        if (cliArguments.hasOwnProperty(arg)) {
            cliArguments[arg](argsArray[index + 1]);
        }
    });
    return config;
}
exports.parseCliArgs = parseCliArgs;
//# sourceMappingURL=parseCliArgs.js.map