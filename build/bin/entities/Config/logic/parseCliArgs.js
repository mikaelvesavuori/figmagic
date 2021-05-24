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
    const setConfigChildValue = (key, childKey, value) => {
        config[key] = Object.assign(Object.assign({}, config[key]), { [childKey]: value });
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
        '--remSize': (val) => setConfigValue('remSize', parseInt(val, 10)),
        '-rem': (val) => setConfigValue('remSize', parseInt(val, 10)),
        '--forceUpdate': () => setConfigChildValue('skipFileGeneration', 'forceUpdate', true),
        '-force': () => setConfigChildValue('skipFileGeneration', 'forceUpdate', true),
        '--skipCss': () => setConfigChildValue('skipFileGeneration', 'skipCss', true),
        '-nocss': () => setConfigChildValue('skipFileGeneration', 'skipCss', true),
        '--skipDescription': () => setConfigChildValue('skipFileGeneration', 'skipDescription', true),
        '-nodesc': () => setConfigChildValue('skipFileGeneration', 'skipDescription', true),
        '--skipReact': () => setConfigChildValue('skipFileGeneration', 'skipReact', true),
        '-noreact': () => setConfigChildValue('skipFileGeneration', 'skipReact', true),
        '--skipStorybook': () => setConfigChildValue('skipFileGeneration', 'skipStorybook', true),
        '-nostory': () => setConfigChildValue('skipFileGeneration', 'skipStorybook', true),
        '--skipStyled': () => setConfigChildValue('skipFileGeneration', 'skipStyled', true),
        '-nostyled': () => setConfigChildValue('skipFileGeneration', 'skipStyled', true),
        '--spacingUnit': (val) => setConfigValue('spacingUnit', val.toLowerCase()),
        '-s': (val) => setConfigValue('spacingUnit', val.toLowerCase()),
        '--syncElements': () => setConfigValue('syncElements', true),
        '-se': () => setConfigValue('syncElements', true),
        '--syncGraphics': () => setConfigValue('syncGraphics', true),
        '-sg': () => setConfigValue('syncGraphics', true),
        '--syncTokens': () => setConfigValue('syncTokens', true),
        '-st': () => setConfigValue('syncTokens', true),
        '--templatePathReact': (val) => setConfigChildValue('templates', 'templatePathReact', val),
        '-tpreact': (val) => setConfigChildValue('templates', 'templatePathReact', val),
        '--templatePathStorybook': (val) => setConfigChildValue('templates', 'templatePathStorybook', val),
        '-tpstory': (val) => setConfigChildValue('templates', 'templatePathStorybook', val),
        '--templatePathStyled': (val) => setConfigChildValue('templates', 'templatePathStyled', val),
        '-tpstyled': (val) => setConfigChildValue('templates', 'templatePathStyled', val),
        '--templatePathGraphic': (val) => setConfigChildValue('templates', 'templatePathGraphic', val),
        '-tpgraphic': (val) => setConfigChildValue('templates', 'templatePathGraphic', val),
        '--token': (val) => setConfigValue('token', val),
        '-t': (val) => setConfigValue('token', val),
        '--tokensRelativeImportPrefix': (val) => setConfigValue('tokensRelativeImportPrefix', val),
        '-tip': (val) => setConfigValue('tokensRelativeImportPrefix', val),
        '--unitlessPrecision': (val) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
        '-up': (val) => setConfigValue('unitlessPrecision', parseInt(val, 10)),
        '--url': (val) => setConfigValue('url', val),
        '-u': (val) => setConfigValue('url', val),
        '--usePostscriptFontNames': () => setConfigValue('usePostscriptFontNames', true),
        '-ps': () => setConfigValue('usePostscriptFontNames', true),
        '--versionName': (val) => setConfigValue('versionName', val),
        '-v': (val) => setConfigValue('versionName', val)
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