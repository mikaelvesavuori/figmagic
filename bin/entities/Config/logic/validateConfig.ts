import { Config } from '../../../contracts/Config';

import { ErrorValidateConfig } from '../../../frameworks/errors/errors';

import {
  ErrorValidateConfigFileName,
  ErrorValidateConfigFontUnit,
  ErrorValidateConfigLetterSpacingUnit,
  ErrorValidateConfigOpacitiesUnit,
  ErrorValidateConfigOutputDataTypeToken,
  ErrorValidateConfigOutputFormatCss,
  ErrorValidateConfigOutputFormatDesc,
  ErrorValidateConfigOutputFormatElements,
  ErrorValidateConfigOutputFormatGraphics,
  ErrorValidateConfigOutputFormatStorybook,
  ErrorValidateConfigOutputFormatTokens,
  ErrorValidateConfigSpacingUnit,
  ErrorValidateConfigTemplatePathReact,
  ErrorValidateConfigTemplatePathStorybook,
  ErrorValidateConfigTemplatePathStyled,
  ErrorValidateConfigFolderName,
  ErrorValidateConfigOutputScaleGraphics
} from '../../../frameworks/errors/errors';

export function validateConfig(config: Config): boolean {
  if (!config) throw new Error(ErrorValidateConfig);
  try {
    validateFontUnit(config.fontUnit);
    validateLetterSpacingUnit(config.letterSpacingUnit);
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
    return true;
  } catch (error) {
    throw new Error(error);
  }
}
import {
  validFontUnitList,
  validLetterSpacingUnitList,
  validOpacitiesUnitList,
  validOutputFormatCssList,
  validOutputFormatDescList,
  validOutputFormatElementsList,
  validOutputFormatGraphicsList,
  validOutputFormatStorybookList,
  validOutputFormatTokensList,
  validOutputDataTypeTokenList,
  validSpacingUnitList
} from '../../../frameworks/system/validatorLists';

const validateFontUnit = (unit: string): boolean => {
  if (validFontUnitList.includes(unit)) return true;
  throw new Error(ErrorValidateConfigFontUnit);
};

const validateLetterSpacingUnit = (unit: string): boolean => {
  if (validLetterSpacingUnitList.includes(unit)) return true;
  throw new Error(ErrorValidateConfigLetterSpacingUnit);
};

const validateOpacitiesUnit = (unit: string): boolean => {
  if (validOpacitiesUnitList.includes(unit)) return true;
  throw new Error(ErrorValidateConfigOpacitiesUnit);
};

const validateFileName = (filename: string): boolean => {
  if (filename) return true;
  throw new Error(ErrorValidateConfigFileName);
};

const validateFolderName = (filename: string): boolean => {
  if (filename) return true;
  throw new Error(ErrorValidateConfigFolderName);
};

const validateOutputFormatCss = (format: string): boolean => {
  if (validOutputFormatCssList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatCss);
};

const validateOutputFormatDesc = (format: string): boolean => {
  if (validOutputFormatDescList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatDesc);
};

const validateOutputFormatElements = (format: string): boolean => {
  if (validOutputFormatElementsList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatElements);
};

const validateOutputFormatGraphics = (format: string): boolean => {
  if (validOutputFormatGraphicsList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatGraphics);
};

const validateOutputFormatStorybook = (format: string): boolean => {
  if (validOutputFormatStorybookList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatStorybook);
};

const validateOutputFormatTokens = (format: string): boolean => {
  if (validOutputFormatTokensList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatTokens);
};

const validateOutputScaleGraphics = (scale: number): boolean => {
  if (scale && typeof scale === 'number' && scale > 0) return true;
  throw new Error(ErrorValidateConfigOutputScaleGraphics);
};

const validateOutputDataTypeToken = (format: string | 'enum' | null): boolean => {
  if (!format || validOutputDataTypeTokenList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputDataTypeToken);
};

const validateSpacingUnit = (unit: string): boolean => {
  if (validSpacingUnitList.includes(unit)) return true;
  throw new Error(ErrorValidateConfigSpacingUnit);
};

const validateTemplatePathReact = (path: string): boolean => {
  if (path) return true;
  throw new Error(ErrorValidateConfigTemplatePathReact);
};

const validateTemplatePathStorybook = (path: string): boolean => {
  if (path) return true;
  throw new Error(ErrorValidateConfigTemplatePathStorybook);
};

const validateTemplatePathStyled = (path: string): boolean => {
  if (path) return true;
  throw new Error(ErrorValidateConfigTemplatePathStyled);
};
