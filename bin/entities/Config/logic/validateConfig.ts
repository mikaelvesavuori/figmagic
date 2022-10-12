import { Config } from '../../../contracts/Config';

import {
  ErrorValidateConfig,
  ErrorValidateBorderWidthUnit,
  ErrorValidateConfigFileName,
  ErrorValidateConfigFolderName,
  ErrorValidateConfigFontUnit,
  ErrorValidateConfigLetterSpacingUnit,
  ErrorValidateConfigLineHeightUnit,
  ErrorValidateConfigOpacitiesUnit,
  ErrorValidateConfigOutputDataTypeToken,
  ErrorValidateConfigOutputFormatColors,
  ErrorValidateConfigOutputFormatCss,
  ErrorValidateConfigOutputFormatDesc,
  ErrorValidateConfigOutputFormatElements,
  ErrorValidateConfigOutputFormatGraphics,
  ErrorValidateConfigOutputFormatStorybook,
  ErrorValidateConfigOutputFormatTokens,
  ErrorValidateConfigOutputScaleGraphics,
  ErrorValidateConfigSpacingUnit,
  ErrorValidateConfigTemplatePathGraphic,
  ErrorValidateConfigTemplatePathReact,
  ErrorValidateConfigTemplatePathStorybook,
  ErrorValidateConfigTemplatePathStyled,
  ErrorValidateRadiusUnit,
  ErrorValidateShadowUnit,
  ErrorValidateDurationUnit
} from '../../../frameworks/errors/errors';

export function validateConfig(config: Config): boolean {
  if (!config) throw Error(ErrorValidateConfig);

  validateBorderWidthUnit(config.borderWidthUnit);
  validateFileName(config.figmaData);
  validateFolderName(config.figmagicFolder);
  validateFolderName(config.outputFolderElements);
  validateFolderName(config.outputFolderGraphics);
  validateFolderName(config.outputFolderTokens);
  validateFontUnit(config.fontUnit);
  validateLetterSpacingUnit(config.letterSpacingUnit);
  validateOpacitiesUnit(config.opacitiesUnit);
  validateOutputDataTypeToken(config.outputDataTypeToken);
  validateOutputFormatColors(config.outputFormatColors);
  validateOutputFormatCss(config.outputFormatCss);
  validateOutputFormatDesc(config.outputFormatDescription);
  validateOutputFormatElements(config.outputFormatElements);
  validateOutputFormatGraphics(config.outputFormatGraphics);
  validateOutputFormatStorybook(config.outputFormatStorybook);
  validateOutputFormatTokens(config.outputFormatTokens);
  validateOutputScaleGraphics(config.outputScaleGraphics);
  validateRadiusUnit(config.radiusUnit);
  validateShadowUnit(config.shadowUnit);
  validateDurationUnit(config.durationUnit);
  validateSpacingUnit(config.spacingUnit);
  validateTemplatePathGraphic(config.templates.templatePathGraphic);
  validateTemplatePathReact(config.templates.templatePathReact);
  validateTemplatePathStorybook(config.templates.templatePathStorybook);
  validateTemplatePathStyled(config.templates.templatePathStyled);
  validLineHeightUnit(config.lineHeightUnit);

  return true;
}
import {
  validBorderWidthUnitList,
  validFontUnitList,
  validLetterSpacingUnitList,
  validLineHeightUnitList,
  validOpacitiesUnitList,
  validOutputDataTypeTokenList,
  validOutputFormatColors,
  validOutputFormatCssList,
  validOutputFormatDescList,
  validOutputFormatElementsList,
  validOutputFormatGraphicsList,
  validOutputFormatStorybookList,
  validOutputFormatTokensList,
  validRadiusUnitList,
  validShadowUnitList,
  validDurationUnitList,
  validSpacingUnitList
} from '../../../frameworks/system/validatorLists';

const validateFontUnit = (unit: string): boolean => {
  if (validFontUnitList.includes(unit)) return true;
  throw Error(ErrorValidateConfigFontUnit);
};

const validateBorderWidthUnit = (unit: string): boolean => {
  if (validBorderWidthUnitList.includes(unit)) return true;
  throw Error(ErrorValidateBorderWidthUnit);
};

const validateRadiusUnit = (unit: string): boolean => {
  if (validRadiusUnitList.includes(unit)) return true;
  throw Error(ErrorValidateRadiusUnit);
};

const validateShadowUnit = (unit: string): boolean => {
  if (validShadowUnitList.includes(unit)) return true;
  throw Error(ErrorValidateShadowUnit);
};

const validateDurationUnit = (unit: string): boolean => {
  if (validDurationUnitList.includes(unit)) return true;
  throw Error(ErrorValidateDurationUnit);
};

const validateLetterSpacingUnit = (unit: string): boolean => {
  if (validLetterSpacingUnitList.includes(unit)) return true;
  throw Error(ErrorValidateConfigLetterSpacingUnit);
};

const validLineHeightUnit = (unit: string): boolean => {
  if (validLineHeightUnitList.includes(unit)) return true;
  throw Error(ErrorValidateConfigLineHeightUnit);
};

const validateOpacitiesUnit = (unit: string): boolean => {
  if (validOpacitiesUnitList.includes(unit)) return true;
  throw Error(ErrorValidateConfigOpacitiesUnit);
};

const validateFileName = (filename: string): boolean => {
  if (filename) return true;
  throw Error(ErrorValidateConfigFileName);
};

const validateFolderName = (filename: string): boolean => {
  if (filename) return true;
  throw Error(ErrorValidateConfigFolderName);
};

const validateOutputFormatColors = (format: string): boolean => {
  if (validOutputFormatColors.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatColors);
};

const validateOutputFormatCss = (format: string): boolean => {
  if (validOutputFormatCssList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatCss);
};

const validateOutputFormatDesc = (format: string): boolean => {
  if (validOutputFormatDescList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatDesc);
};

const validateOutputFormatElements = (format: string): boolean => {
  if (validOutputFormatElementsList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatElements);
};

const validateOutputFormatGraphics = (format: string): boolean => {
  if (validOutputFormatGraphicsList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatGraphics);
};

const validateOutputFormatStorybook = (format: string): boolean => {
  if (validOutputFormatStorybookList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatStorybook);
};

const validateOutputFormatTokens = (format: string): boolean => {
  if (validOutputFormatTokensList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputFormatTokens);
};

const validateOutputScaleGraphics = (scale: number): boolean => {
  if (scale && typeof scale === 'number' && scale > 0) return true;
  throw Error(ErrorValidateConfigOutputScaleGraphics);
};

const validateOutputDataTypeToken = (format: string | 'enum' | null): boolean => {
  if (!format || validOutputDataTypeTokenList.includes(format)) return true;
  throw Error(ErrorValidateConfigOutputDataTypeToken);
};

const validateSpacingUnit = (unit: string): boolean => {
  if (validSpacingUnitList.includes(unit)) return true;
  throw Error(ErrorValidateConfigSpacingUnit);
};

const validateTemplatePathReact = (path: string): boolean => {
  if (path) return true;
  throw Error(ErrorValidateConfigTemplatePathReact);
};

const validateTemplatePathStorybook = (path: string): boolean => {
  if (path) return true;
  throw Error(ErrorValidateConfigTemplatePathStorybook);
};

const validateTemplatePathStyled = (path: string): boolean => {
  if (path) return true;
  throw Error(ErrorValidateConfigTemplatePathStyled);
};

const validateTemplatePathGraphic = (path: string): boolean => {
  if (path) return true;
  throw Error(ErrorValidateConfigTemplatePathGraphic);
};
