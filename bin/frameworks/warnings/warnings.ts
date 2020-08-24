import { colors } from '../system/colors';

export const WarnNormalizeUnits: string = `${colors.FgYellow}normalizeUnits(): rootSize and/or unitSize variables are either undefined or not incoming as px values.`;
export const WarnParseCliArgsFontUnit: string = `${colors.FgYellow}Received unrecognized "fontUnit" argument, it must be "rem" (default) or "em". Setting to default value...`;
export const WarnParseCliArgsOpacitiesUnit: string = `${colors.FgYellow}Received unrecognized "opacitiesUnit" argument, it must be "float" (default) or "percent". Setting to default value...`;
export const WarnParseCliArgsLetterSpacingUnit: string = `${colors.FgYellow}Received unrecognized "letterSpacingUnit" argument, it must be "em" (default), "px". Setting to default value...`;
export const WarnParseCliArgsOutputFormat: string = `${colors.FgYellow}Received unrecognized "outputFormat" argument, it must be "mjs" (default) or "js". Setting to default value...`;
export const WarnParseCliArgsSpacingUnit: string = `${colors.FgYellow}Received unrecognized "spacingUnit" argument, it must be "rem" (default) or "em". Setting to default value...`;
export const WarnParseCssFromElementNoTokenMatch: string = `${colors.FgYellow}No token match when processing css from element!`;
