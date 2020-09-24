"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WarnParseCssFromElementNoTokenMatch = exports.WarnParseCliArgsSpacingUnit = exports.WarnParseCliArgsOutputFormat = exports.WarnParseCliArgsOpacitiesUnit = exports.WarnParseCliArgsLetterSpacingUnit = exports.WarnParseCliArgsFontUnit = exports.WarnNormalizeUnits = void 0;
const colors_1 = require("../system/colors");
exports.WarnNormalizeUnits = `${colors_1.colors.FgYellow}normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.${colors_1.colors.Reset}`;
exports.WarnParseCliArgsFontUnit = `${colors_1.colors.FgYellow}Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em". Setting to default value...${colors_1.colors.Reset}`;
exports.WarnParseCliArgsLetterSpacingUnit = `${colors_1.colors.FgYellow}Received unrecognized "letterSpacingUnit" argument, it must be "em" (default), "px". Setting to default value...${colors_1.colors.Reset}`;
exports.WarnParseCliArgsOpacitiesUnit = `${colors_1.colors.FgYellow}Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent". Setting to default value...${colors_1.colors.Reset}`;
exports.WarnParseCliArgsOutputFormat = `${colors_1.colors.FgYellow}Received unrecognized "outputFormat" argument, it must be "mjs" (default) or "js". Setting to default value...${colors_1.colors.Reset}`;
exports.WarnParseCliArgsSpacingUnit = `${colors_1.colors.FgYellow}Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em". Setting to default value...${colors_1.colors.Reset}`;
exports.WarnParseCssFromElementNoTokenMatch = `${colors_1.colors.FgYellow}No token match when processing css from element!${colors_1.colors.Reset}`;
//# sourceMappingURL=warnings.js.map