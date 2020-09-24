"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseCliArgs = void 0;
const warnings_1 = require("../../../frameworks/warnings/warnings");
const errors_1 = require("../../../frameworks/errors/errors");
function parseCliArgs(baseConfig, argsArray) {
    if (!argsArray)
        throw new Error(errors_1.ErrorParseCliArgs);
    if (argsArray.length === 0)
        return {};
    return argsArray.reduce((accumulatedConfig, arg, index) => {
        switch (arg) {
            case '--debug':
                accumulatedConfig.debugMode = true;
                break;
            case '--recompileLocal':
                accumulatedConfig.recompileLocal = true;
                break;
            case '--syncGraphics':
                accumulatedConfig.syncGraphics = true;
                break;
            case '--syncElements':
                accumulatedConfig.syncElements = true;
                break;
            case '--skipReact':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    skipReact: true
                };
                break;
            case '--skipStyled':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    skipStyled: true
                };
                break;
            case '--skipCss':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    skipCss: true
                };
                break;
            case '--skipStorybook':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    skipStorybook: true
                };
                break;
            case '--skipDescription':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    skipDescription: true
                };
                break;
            case '--forceUpdate':
                accumulatedConfig.skipFileGeneration = {
                    ...accumulatedConfig.skipFileGeneration,
                    forceUpdate: true
                };
                break;
            case '--outputTokenFormat':
            case '-tf': {
                let outputTokenFormat = argsArray[index + 1].toLowerCase();
                if (!['mjs', 'js'].includes(outputTokenFormat)) {
                    console.warn(warnings_1.WarnParseCliArgsOutputFormat);
                    outputTokenFormat = baseConfig.outputTokenFormat;
                }
                accumulatedConfig.outputTokenFormat = outputTokenFormat;
                break;
            }
            case '--fontUnit':
            case '-f': {
                let fontUnit = argsArray[index + 1].toLowerCase();
                if (!['rem', 'em'].includes(fontUnit)) {
                    console.warn(warnings_1.WarnParseCliArgsFontUnit);
                    fontUnit = baseConfig.fontUnit;
                }
                accumulatedConfig.fontUnit = fontUnit;
                break;
            }
            case '--letterSpacingUnit':
            case '-lsu': {
                let letterSpacingUnit = argsArray[index + 1].toLowerCase();
                if (!['em', 'px'].includes(letterSpacingUnit)) {
                    console.warn(warnings_1.WarnParseCliArgsLetterSpacingUnit);
                    letterSpacingUnit = baseConfig.letterSpacingUnit;
                }
                accumulatedConfig.letterSpacingUnit = letterSpacingUnit;
                break;
            }
            case '--opacitiesUnit':
            case '-ou': {
                let opacitiesUnit = argsArray[index + 1].toLowerCase();
                if (!['float', 'percent'].includes(opacitiesUnit)) {
                    console.warn(warnings_1.WarnParseCliArgsOpacitiesUnit);
                    opacitiesUnit = baseConfig.opacitiesUnit;
                }
                accumulatedConfig.opacitiesUnit = opacitiesUnit;
                break;
            }
            case '--spacingUnit':
            case '-s': {
                let spacingUnit = argsArray[index + 1].toLowerCase();
                if (!['rem', 'em'].includes(spacingUnit)) {
                    console.warn(warnings_1.WarnParseCliArgsSpacingUnit);
                    spacingUnit = baseConfig.spacingUnit;
                }
                accumulatedConfig.spacingUnit = spacingUnit;
                break;
            }
            case '--token':
            case '-t':
                accumulatedConfig.token = argsArray[index + 1];
                break;
            case '--url':
            case '-u':
                accumulatedConfig.url = argsArray[index + 1];
                break;
            case '--outputFolderBaseFile':
            case '-base':
                accumulatedConfig.outputFolderBaseFile = argsArray[index + 1];
                break;
            case '--outputFolderTokens':
            case '-tokens':
                accumulatedConfig.outputFolderTokens = argsArray[index + 1];
                break;
            case '--outputFolderElements':
            case '-elements':
                accumulatedConfig.outputFolderElements = argsArray[index + 1];
                break;
            case '--outputFileName':
            case '-file':
                accumulatedConfig.outputFileName = argsArray[index + 1];
                break;
            case '--outputTokenDataType':
            case '-tokentype':
                accumulatedConfig.outputTokenDataType = argsArray[index + 1];
                break;
            case '--usePostscriptFontNames':
            case '-ps':
                accumulatedConfig.usePostscriptFontNames = true;
                break;
            case '--templatePathReact':
                accumulatedConfig.templates = {
                    ...accumulatedConfig.templates,
                    templatePathReact: argsArray[index + 1]
                };
                break;
            case '--templatePathStyled':
                accumulatedConfig.templates = {
                    ...accumulatedConfig.templates,
                    templatePathStyled: argsArray[index + 1]
                };
                break;
            case '--templatePathStorybook':
                accumulatedConfig.templates = {
                    ...accumulatedConfig.templates,
                    templatePathStorybook: argsArray[index + 1]
                };
                break;
        }
        return accumulatedConfig;
    }, {});
}
exports.parseCliArgs = parseCliArgs;
//# sourceMappingURL=parseCliArgs.js.map