"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateConfig = void 0;
const errors_1 = require("../../../frameworks/errors/errors");
const errors_2 = require("../../../frameworks/errors/errors");
function validateConfig(config) {
    if (!config)
        throw new Error(errors_1.ErrorValidateConfig);
    try {
        validateFontUnit(config.fontUnit);
        validateLetterSpacingUnit(config.letterSpacingUnit);
        validLineHeightUnit(config.lineHeightUnit);
        validateOpacitiesUnit(config.opacitiesUnit);
        validateFileName(config.figmaData);
        validateFolderName(config.figmagicFolder);
        validateFolderName(config.outputFolderElements);
        validateFolderName(config.outputFolderGraphics);
        validateFolderName(config.outputFolderTokens);
        validateOutputFormatCss(config.outputFormatCss);
        validateOutputFormatDesc(config.outputFormatDescription);
        validateOutputFormatElements(config.outputFormatElements);
        validateOutputFormatGraphics(config.outputFormatGraphics);
        validateOutputFormatStorybook(config.outputFormatStorybook);
        validateOutputFormatTokens(config.outputFormatTokens);
        validateOutputScaleGraphics(config.outputScaleGraphics);
        validateOutputDataTypeToken(config.outputDataTypeToken);
        validateSpacingUnit(config.spacingUnit);
        validateTemplatePathReact(config.templates.templatePathReact);
        validateTemplatePathStorybook(config.templates.templatePathStorybook);
        validateTemplatePathStyled(config.templates.templatePathStyled);
        validateTemplatePathGraphic(config.templates.templatePathGraphic);
        return true;
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
    throw new Error(errors_2.ErrorValidateConfigFontUnit);
};
const validateLetterSpacingUnit = (unit) => {
    if (validatorLists_1.validLetterSpacingUnitList.includes(unit))
        return true;
    throw new Error(errors_2.ErrorValidateConfigLetterSpacingUnit);
};
const validLineHeightUnit = (unit) => {
    if (validatorLists_1.validLineHeightUnitList.includes(unit))
        return true;
    throw new Error(errors_2.ErrorValidateConfigLineHeightUnit);
};
const validateOpacitiesUnit = (unit) => {
    if (validatorLists_1.validOpacitiesUnitList.includes(unit))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOpacitiesUnit);
};
const validateFileName = (filename) => {
    if (filename)
        return true;
    throw new Error(errors_2.ErrorValidateConfigFileName);
};
const validateFolderName = (filename) => {
    if (filename)
        return true;
    throw new Error(errors_2.ErrorValidateConfigFolderName);
};
const validateOutputFormatCss = (format) => {
    if (validatorLists_1.validOutputFormatCssList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatCss);
};
const validateOutputFormatDesc = (format) => {
    if (validatorLists_1.validOutputFormatDescList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatDesc);
};
const validateOutputFormatElements = (format) => {
    if (validatorLists_1.validOutputFormatElementsList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatElements);
};
const validateOutputFormatGraphics = (format) => {
    if (validatorLists_1.validOutputFormatGraphicsList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatGraphics);
};
const validateOutputFormatStorybook = (format) => {
    if (validatorLists_1.validOutputFormatStorybookList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatStorybook);
};
const validateOutputFormatTokens = (format) => {
    if (validatorLists_1.validOutputFormatTokensList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputFormatTokens);
};
const validateOutputScaleGraphics = (scale) => {
    if (scale && typeof scale === 'number' && scale > 0)
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputScaleGraphics);
};
const validateOutputDataTypeToken = (format) => {
    if (!format || validatorLists_1.validOutputDataTypeTokenList.includes(format))
        return true;
    throw new Error(errors_2.ErrorValidateConfigOutputDataTypeToken);
};
const validateSpacingUnit = (unit) => {
    if (validatorLists_1.validSpacingUnitList.includes(unit))
        return true;
    throw new Error(errors_2.ErrorValidateConfigSpacingUnit);
};
const validateTemplatePathReact = (path) => {
    if (path)
        return true;
    throw new Error(errors_2.ErrorValidateConfigTemplatePathReact);
};
const validateTemplatePathStorybook = (path) => {
    if (path)
        return true;
    throw new Error(errors_2.ErrorValidateConfigTemplatePathStorybook);
};
const validateTemplatePathStyled = (path) => {
    if (path)
        return true;
    throw new Error(errors_2.ErrorValidateConfigTemplatePathStyled);
};
const validateTemplatePathGraphic = (path) => {
    if (path)
        return true;
    throw new Error(errors_2.ErrorValidateConfigTemplatePathGraphic);
};
//# sourceMappingURL=validateConfig.js.map