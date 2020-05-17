import { colors } from './colors.mjs';

export const warnNormalizeUnits = `${colors.FgYellow}normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.`;
export const warnParseCliArgsFontUnit = `${colors.FgYellow}Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em". Setting to default value...`;
export const warnParseCliArgsOpacitiesUnit = `${colors.FgYellow}Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent". Setting to default value...`;
export const warnParseCliArgsLetterSpacingUnit = `${colors.FgYellow}Received unrecognized "letterSpacingUnit" argument, it must be "em" (default), "px". Setting to default value...`;
export const warnParseCliArgsOutputFormat = `${colors.FgYellow}Received unrecognized "outputFormat" argument, it must be "mjs" (default) or "js". Setting to default value...`;
export const warnParseCliArgsSpacingUnit = `${colors.FgYellow}Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em". Setting to default value...`;
export const warnParseCssFromElementNoTokenMatch = `${colors.FgYellow}No token match when processing css from element!`;
