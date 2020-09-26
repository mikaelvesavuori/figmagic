"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
function validateConfig(config) {
    try {
        validateFontUnit(config.fontUnit);
        validateLetterSpacingUnit(config.letterSpacingUnit);
        validateOpacitiesUnit(config.opacitiesUnit);
        validateFileName(config.outputFileName);
        validateFileName(config.outputFolderBaseFile);
        validateFolderName(config.outputFolderElements);
        validateFolderName(config.outputFolderGraphics);
        validateFolderName(config.outputFolderTokens);
        validateOutputFormatCss(config.outputFormatCss);
        validateOutputFormatElements(config.outputFormatElements);
        validateOutputFormatGraphics(config.outputFormatGraphics);
        validateOutputFormatTokens(config.outputFormatTokens);
        validateOutputScaleGraphics(config.outputScaleGraphics);
        validateOutputDataTypeToken(config.outputDataTypeToken);
        validateSpacingUnit(config.spacingUnit);
        validateTemplatePathReact(config.templates.templatePathReact);
        validateTemplatePathStorybook(config.templates.templatePathStorybook);
        validateTemplatePathStyled(config.templates.templatePathStyled);
    }
    catch (error) {
        throw new Error(error);
    }
}
exports.validateConfig = validateConfig;
const validatorLists_1 = require("../../../frameworks/system/validatorLists");
const validateFontUnit = (unit) => {
    if (validatorLists_1.validFontUnitList.includes(unit))
        return true;
    throw new Error(errors_1.ErrorValidateConfigFontUnit);
};
const validateLetterSpacingUnit = (unit) => {
    if (validatorLists_1.validLetterSpacingUnitList.includes(unit))
        return true;
    throw new Error(errors_1.ErrorValidateConfigLetterSpacingUnit);
};
const validateOpacitiesUnit = (unit) => {
    if (validatorLists_1.validOpacitiesUnitList.includes(unit))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOpacitiesUnit);
};
const validateFileName = (filename) => {
    if (filename)
        return true;
    throw new Error(errors_1.ErrorValidateConfigFileName);
};
const validateFolderName = (filename) => {
    if (filename)
        return true;
    throw new Error(errors_1.ErrorValidateConfigFolderName);
};
const validateOutputFormatCss = (format) => {
    if (validatorLists_1.validOutputFormatCssList.includes(format))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputFormatCss);
};
const validateOutputFormatElements = (format) => {
    if (validatorLists_1.validOutputFormatElementsList.includes(format))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputFormatElements);
};
const validateOutputFormatGraphics = (format) => {
    if (validatorLists_1.validOutputFormatGraphicsList.includes(format))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputFormatGraphics);
};
const validateOutputFormatTokens = (format) => {
    if (validatorLists_1.validOutputFormatTokensList.includes(format))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputFormatTokens);
};
const validateOutputScaleGraphics = (scale) => {
    if (typeof scale === 'number')
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputScaleGraphics);
};
const validateOutputDataTypeToken = (format) => {
    if (!format || validatorLists_1.validOutputDataTypeTokenList.includes(format))
        return true;
    throw new Error(errors_1.ErrorValidateConfigOutputDataTypeToken);
};
const validateSpacingUnit = (unit) => {
    if (validatorLists_1.validSpacingUnitList.includes(unit))
        return true;
    throw new Error(errors_1.ErrorValidateConfigSpacingUnit);
};
const validateTemplatePathReact = (path) => {
    if (path)
        return true;
    throw new Error(errors_1.ErrorValidateConfigTemplatePathReact);
};
const validateTemplatePathStorybook = (path) => {
    if (path)
        return true;
    throw new Error(errors_1.ErrorValidateConfigTemplatePathStorybook);
};
const validateTemplatePathStyled = (path) => {
    if (path)
        return true;
    throw new Error(errors_1.ErrorValidateConfigTemplatePathStyled);
};
//# sourceMappingURL=validateConfig.js.map