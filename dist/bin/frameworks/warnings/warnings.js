"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarnValidateConfigSpacingUnit = exports.WarnValidateConfigOutputDataTypeToken = exports.WarnValidateConfigOutputFormatTokens = exports.WarnValidateConfigOutputFormatGraphics = exports.WarnValidateConfigOutputFormatCss = exports.WarnValidateConfigOpacitiesUnit = exports.WarnValidateConfigLetterSpacingUnit = exports.WarnValidateConfigFontUnit = exports.WarnParseCssFromElementNoTokenMatch = exports.WarnNormalizeUnits = void 0;
const colors_1 = require("../system/colors");
exports.WarnNormalizeUnits = `${colors_1.colors.FgYellow}normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.${colors_1.colors.Reset}`;
exports.WarnParseCssFromElementNoTokenMatch = `${colors_1.colors.FgYellow}No token match when processing css from element!${colors_1.colors.Reset}`;
exports.WarnValidateConfigFontUnit = `${colors_1.colors.FgYellow}Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em".${colors_1.colors.Reset}`;
exports.WarnValidateConfigLetterSpacingUnit = `${colors_1.colors.FgYellow}Received unrecognized "letterSpacingUnit" argument, it must be "em" (default), "px".${colors_1.colors.Reset}`;
exports.WarnValidateConfigOpacitiesUnit = `${colors_1.colors.FgYellow}Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent".${colors_1.colors.Reset}`;
exports.WarnValidateConfigOutputFormatCss = `${colors_1.colors.FgYellow}Received unrecognized "outputFormatCss" arguments, it must be "ts" (default), "mjs" or "js".${colors_1.colors.Reset}`;
exports.WarnValidateConfigOutputFormatGraphics = `${colors_1.colors.FgYellow}Received unrecognized "outputFormatGraphics" arguments, it must be "svg" (default) or "png".${colors_1.colors.Reset}`;
exports.WarnValidateConfigOutputFormatTokens = `${colors_1.colors.FgYellow}Received unrecognized "outputFormatTokens" arguments, it must be "ts" (default), "mjs" or "js".${colors_1.colors.Reset}`;
exports.WarnValidateConfigOutputDataTypeToken = `${colors_1.colors.FgYellow}Received unrecognized "outputDataTypeToken" arguments, it must be null (default), or "enum".${colors_1.colors.Reset}`;
exports.WarnValidateConfigSpacingUnit = `${colors_1.colors.FgYellow}Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em".${colors_1.colors.Reset}`;
//# sourceMappingURL=warnings.js.map