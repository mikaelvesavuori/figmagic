import { Config } from '../../../contracts/Config';

import {
  ErrorValidateConfigFileName,
  ErrorValidateConfigFontUnit,
  ErrorValidateConfigLetterSpacingUnit,
  ErrorValidateConfigOpacitiesUnit,
  ErrorValidateConfigOutputDataTypeToken,
  ErrorValidateConfigOutputFormatCss,
  ErrorValidateConfigOutputFormatGraphics,
  ErrorValidateConfigOutputFormatTokens,
  ErrorValidateConfigSpacingUnit,
  ErrorValidateConfigTemplatePathReact,
  ErrorValidateConfigTemplatePathStorybook,
  ErrorValidateConfigTemplatePathStyled,
  ErrorValidateConfigFolderName,
  ErrorValidateConfigOutputScaleGraphics
} from '../../../frameworks/errors/errors';

export function validateConfig(config: Config): void {
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
    validateOutputFormatGraphics(config.outputFormatGraphics);
    validateOutputFormatTokens(config.outputFormatTokens);
    validateOutputScaleGraphics(config.outputScaleGraphics);
    validateOutputDataTypeToken(config.outputDataTypeToken);
    validateSpacingUnit(config.spacingUnit);
    validateTemplatePathReact(config.templates.templatePathReact);
    validateTemplatePathStorybook(config.templates.templatePathStorybook);
    validateTemplatePathStyled(config.templates.templatePathStyled);
  } catch (error) {
    throw new Error(error);
  }
}
import {
  validFontUnitList,
  validLetterSpacingUnitList,
  validOpacitiesUnitList,
  validOutputFormatCssList,
  validOutputFormatGraphicsList,
  validOutputFormatTokensList,
  validOutputDataTypeTokenList,
  validSpacingUnitList,
  validTemplatePathReactFiletype,
  validTemplatePathStorybookFiletype,
  validTemplatePathStyledFiletype
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

const validateOutputFormatGraphics = (format: string): boolean => {
  if (validOutputFormatGraphicsList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatGraphics);
};

const validateOutputFormatTokens = (format: string): boolean => {
  if (validOutputFormatTokensList.includes(format)) return true;
  throw new Error(ErrorValidateConfigOutputFormatTokens);
};

const validateOutputScaleGraphics = (scale: number): boolean => {
  if (typeof scale === 'number') return true;
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
  if (path && path.includes(validTemplatePathReactFiletype)) return true;
  throw new Error(ErrorValidateConfigTemplatePathReact);
};

const validateTemplatePathStorybook = (path: string): boolean => {
  if (path && path.includes(validTemplatePathStorybookFiletype)) return true;
  throw new Error(ErrorValidateConfigTemplatePathStorybook);
};

const validateTemplatePathStyled = (path: string): void | boolean => {
  if (path && path.includes(validTemplatePathStyledFiletype)) return true;
  throw new Error(ErrorValidateConfigTemplatePathStyled);
};
