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
        '--outputFileName': (val) => (config.outputFileName = val),
        '-file': (val) => (config.outputFileName = val),
        '--outputFolderBaseFile': (val) => (config.outputFolderBaseFile = val),
        '-base': (val) => (config.outputFolderBaseFile = val),
        '--outputFolderElements': (val) => (config.outputFolderElements = val),
        '-elements': (val) => (config.outputFolderElements = val),
        '--outputFolderGraphics': (val) => (config.outputFolderGraphics = val),
        '-graphics': (val) => (config.outputFolderGraphics = val),
        '--outputFolderTokens': (val) => (config.outputFolderTokens = val),
        '-tokens': (val) => (config.outputFolderTokens = val),
        '--outputFormatCss': (val) => (config.outputFormatCss = val.toLowerCase()),
        '-fc': (val) => (config.outputFormatCss = val.toLowerCase()),
        '--outputFormatElements': (val) => (config.outputFormatElements = val.toLowerCase()),
        '-fe': (val) => (config.outputFormatElements = val.toLowerCase()),
        '--outputFormatGraphics': (val) => (config.outputFormatGraphics = val.toLowerCase()),
        '-fg': (val) => (config.outputFormatGraphics = val.toLowerCase()),
        '--outputFormatTokens': (val) => (config.outputFormatTokens = val.toLowerCase()),
        '-ft': (val) => (config.outputFormatTokens = val.toLowerCase()),
        '--outputScaleGraphics': (val) => (config.outputScaleGraphics = val),
        '-scale': (val) => (config.outputScaleGraphics = val),
        '--outputDataTypeToken': (val) => (config.outputDataTypeToken = val.toLowerCase()),
        '-tokentype': (val) => (config.outputDataTypeToken = val.toLowerCase()),
        '--recompileLocal': () => (config.recompileLocal = true),
        '-local': () => (config.recompileLocal = true),
        '--remSize': (val) => (config.remSize = typeof val === 'string' ? parseInt(val) : val),
        '-rem': (val) => (config.remSize = typeof val === 'string' ? parseInt(val) : val),
        '--forceUpdate': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            forceUpdate: true
        }),
        '-force': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            forceUpdate: true
        }),
        '--skipCss': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipCss: true
        }),
        '-nocss': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipCss: true
        }),
        '--skipDescription': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipDescription: true
        }),
        '-nodesc': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipDescription: true
        }),
        '--skipReact': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipReact: true
        }),
        '-noreact': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipReact: true
        }),
        '--skipStorybook': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipStorybook: true
        }),
        '-nostory': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipStorybook: true
        }),
        '--skipStyled': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipStyled: true
        }),
        '-nostyled': () => (config.skipFileGeneration = {
            ...config.skipFileGeneration,
            skipStyled: true
        }),
        '--spacingUnit': (val) => (config.spacingUnit = val.toLowerCase()),
        '-s': (val) => (config.spacingUnit = val.toLowerCase()),
        '--syncElements': () => (config.syncElements = true),
        '-se': () => (config.syncElements = true),
        '--syncGraphics': () => (config.syncGraphics = true),
        '-sg': () => (config.syncGraphics = true),
        '--syncTokens': () => (config.syncTokens = true),
        '-st': () => (config.syncTokens = true),
        '--templatePathReact': (val) => (config.templates = {
            ...config.templates,
            templatePathReact: val
        }),
        '-tpreact': (val) => (config.templates = {
            ...config.templates,
            templatePathReact: val
        }),
        '--templatePathStorybook': (val) => (config.templates = {
            ...config.templates,
            templatePathStorybook: val
        }),
        '-tpstory': (val) => (config.templates = {
            ...config.templates,
            templatePathStorybook: val
        }),
        '--templatePathStyled': (val) => (config.templates = {
            ...config.templates,
            templatePathStyled: val
        }),
        '-tpstyled': (val) => (config.templates = {
            ...config.templates,
            templatePathStyled: val
        }),
        '--token': (val) => (config.token = val),
        '-t': (val) => (config.token = val),
        '--url': (val) => (config.url = val),
        '-u': (val) => (config.url = val),
        '--usePostscriptFontNames': () => (config.usePostscriptFontNames = true),
        '-ps': () => (config.usePostscriptFontNames = true)
    };
    const config = {};
    const args = {};
    if (argsArray.length > 0) {
        argsArray.map((arg) => (args[arg] = arg));
        Object.keys(args).forEach((arg, index) => {
            if (cliArguments.hasOwnProperty(arg))
                cliArguments[arg](argsArray[index + 1]);
        });
    }
    return config;
}
exports.parseCliArgs = parseCliArgs;
//# sourceMappingURL=parseCliArgs.js.map